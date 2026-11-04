import { Request, Response } from "express";
import Blog from "../models/Blog";
import Category from "../models/Category";
import mongoose from "mongoose";
import { getPagination } from "../utils/pagination";
import User from "../models/User";

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "string") {
    if (!value.trim()) return [];

    // Supports JSON arrays, e.g. '["tech", "news"]'
    if (value.trim().startsWith("[")) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map(String).filter(Boolean);
        }
      } catch {
        return [];
      }
    }

    return [value];
  }

  return [];
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      reading,
      isPublished,
      isFeatured,
    } = req.body;

    const category = parseStringArray(req.body.category);
    const tags = parseStringArray(req.body.tags);

    const thumbnail = req.file?.path;

    if (
        !title?.trim() ||
        !slug?.trim() ||
        !excerpt?.trim() ||
        !content?.trim() ||
        !thumbnail ||
        category.length === 0 ||
        !author ||
        reading === undefined ||
        reading === null ||
        reading === "" ||
        !Number.isFinite(Number(reading)) ||
        Number(reading) <= 0
    ) {
        return res.status(400).json({
            message: "Please provide all required blog fields",
        });
    }

    if (
      !mongoose.Types.ObjectId.isValid(author) ||
      category.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({
        message: "Invalid author or category ID",
      });
    }

    const writer = await User.findById(author);

    if (!writer || !writer.isWriter) {
      return res.status(400).json({
        message: "Selected author is not a valid writer",
      });
    }

    const validCategories = await Category.countDocuments({
      _id: { $in: category },
    });

    if (validCategories !== new Set(category).size) {
      return res.status(400).json({
        message: "One or more categories do not exist",
      });
    }

    const newBlog = await Blog.create({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      thumbnail,
      category: [...new Set(category)],
      tags,
      author,
      reading: Number(reading),
      isPublished: isPublished === "true",
      isFeatured: isFeatured === "true",
    });

    return res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
    } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
        message: "Blog validation failed",
        errors: Object.values(error.errors).map(
            (item) => item.message
        ),
        });
    }

    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({
        message: "Invalid data provided",
        error: error.message,
        });
    }

    return res.status(500).json({
        message: "Failed to create blog",
        error: error instanceof Error ? error.message : "Unknown error",
    });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  

        const publishedFilter = { isPublished : true };

        const blogs = await Blog.find(publishedFilter)
        .sort({ createdAt : -1, _id : -1})
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("author");

        const totalBlogs = await Blog.countDocuments(publishedFilter);

        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            blogs, 
            currentPage : page, 
            totalPages, 
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });
    } catch(error) {
        res.status(500).json({ message : "Server error" })
    }
};

export const getBlogsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findOne({
      _id: id,
      isPublished: true,
    })
      .populate("category")
      .populate("author");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      data: blog,
    });
  } catch (error) {
    console.error("GET BLOG BY ID ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getSidebarData = async (req: Request, res: Response) => {
    try {
        const featuredWriters = await User.find({
            isWriter: true, 
            isFeaturedWriter: true
        })
        .select("name designation profileImage slug aboutMe location fbLink twitterLink instagramLink linkedinLink")
        .sort({ createdAt : -1 });

        const publishedFilter = { isPublished : true };

        const featuredBlogs = await Blog.find({
          ...publishedFilter,
          isFeatured: true,
        })
        .limit(5)
        .populate("category")
        .populate("author")
        .sort({createdAt : -1});
        
        const latestBlogs = await Blog.find(publishedFilter)
        .limit(3)
        .populate("category")
        .populate("author")
        .sort({createdAt : -1});

        res.status(200).json({
            featuredWriters,
            featuredBlogs,
            latestBlogs,
        });
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

export const getBlogsBySearch = async (req: Request, res: Response) => {
    try {
        const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
        const { q } = req.query;

        if (!q || typeof q !== "string") {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const escapeRegex = (value: string) =>
          value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const safeQuery = escapeRegex(q.trim());

        const searchQuery = {
            $or: [
                { title: { $regex: safeQuery, $options: "i" } },
                { excerpt: { $regex: safeQuery, $options: "i" } },
                { tags: { $in: [new RegExp(safeQuery, "i")] } }
            ]
        };

        const publishedFilter = { isPublished : true };

        const filter = {
          ...searchQuery,
          ...publishedFilter,
        };

        const blogs = await Blog.find(filter)
            .populate("category")
            .populate("author")
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments(filter);

        const totalPages = Math.ceil(totalBlogs / limit);

        return res.status(200).json({
            blogs,
            currentPage: page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getBlogsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const publishedFilter = { isPublished : true };

    const blog = await Blog.findOne({ 
      slug,
      ...publishedFilter
    })
      .populate("category")
      .populate("author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Only published blogs should appear in public article navigation.

    // Find the closest newer article.
    let previousBlog = await Blog.findOne({
      ...publishedFilter,
      $or: [
        { createdAt: { $gt: blog.createdAt } },
        {
          createdAt: blog.createdAt,
          _id: { $gt: blog._id },
        },
      ],
    })
      .select("title slug createdAt")
      .sort({ createdAt: 1, _id: 1 });

    // If there is no newer article, wrap around to the oldest article.
    if (!previousBlog) {
      previousBlog = await Blog.findOne({
        ...publishedFilter,
        _id: { $ne: blog._id },
      })
        .select("title slug createdAt")
        .sort({ createdAt: 1, _id: 1 });
    }

    // Find the closest older article.
    let nextBlog = await Blog.findOne({
      ...publishedFilter,
      $or: [
        { createdAt: { $lt: blog.createdAt } },
        {
          createdAt: blog.createdAt,
          _id: { $lt: blog._id },
        },
      ],
    })
      .select("title slug createdAt")
      .sort({ createdAt: -1, _id: -1 });

    // If there is no older article, wrap around to the newest article.
    if (!nextBlog) {
      nextBlog = await Blog.findOne({
        ...publishedFilter,
        _id: { $ne: blog._id },
      })
        .select("title slug createdAt")
        .sort({ createdAt: -1, _id: -1 });
    }

    return res.status(200).json({
      blog,
      previousBlog,
      nextBlog,
    });
  } catch (error) {
    console.error("GET BLOG BY SLUG ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getBlogsByCategory = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  
        const { slug } = req.params;

        const category = await Category.findOne({ slug });

        if(!category) {
            return res.status(404).json({ message : "Category not found"});
        } 

        const publishedFilter = { isPublished : true };

        const filter = {
          category: category._id,
          ...publishedFilter,
        };

        
        const blogs = await Blog.find(filter)
        .populate("category")
        .populate("author")
        .sort({ createdAt : -1, _id : -1})
        .skip(skip)
        .limit(limit);

        const totalBlogs = await Blog.countDocuments(filter);
        
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            blogs,
            currentPage : page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });
    }catch (error) {
        res.status(500).json({ message : "Server error"});
    }
};

export const getWriters = async (req: Request, res: Response) => {
    try {
        const writers = await User.find({
            isWriter : true,
        })
        .select(
            "name designation profileImage slug aboutMe location fbLink twitterLink instagramLink linkedinLink isFeaturedLink"
        )
        .sort({ createdAt : -1 });

        return res.status(200).json(writers);
    } catch (error) {
        console.error("GET WRITERS ERROR:", error);
        
        return res.status(500).json({
            message : "Server error",
        });
    }
}; 

export const getWriterBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        
        const writer = await User.findOne({
            slug, 
            isWriter : true,
        }).select(
            "name slug designation profileImage aboutMe location fbLink twitterLink instagramLink linkedinLink isFeaturedWriter createdAt"
        );

        if(!writer) {
            return res.status(404).json({
                message : "Writer not found",
            });
        }

        return res.status(200).json(writer);
    } catch (error) {
        console.error("GET WRITER BY SLUG ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

export const getBlogsByWriter = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  
        const { slug } = req.params;

        const writer = await User.findOne({ slug, isWriter : true, })
        .select(
            "name designation profileImage slug aboutMe location fbLink twitterLink instagramLink linkedinLink isFeaturedLink"
        );

        if(!writer) {
            return res.status(404).json({message : "User not found"});
        }

        const filter = {
          author: writer._id,
          isPublished: true,
        };

        const blogs = await Blog.find(filter)
        .populate("category")
        .populate("author")
        .sort({ createdAt: -1, _id : -1 })
        .skip(skip)
        .limit(limit);

         const totalBlogs = await Blog.countDocuments({
            author: writer._id
        });
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            writer,
            blogs,
            currentPage : page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });


    } catch (error) {
        res.status(500).json({ message : "Server Error" });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const {
      title,
      slug,
      excerpt,
      content,
      author,
      reading,
      isPublished,
      isFeatured,
    } = req.body;

    if (title !== undefined) blog.title = title.trim();
    if (slug !== undefined) blog.slug = slug.trim();
    if (excerpt !== undefined) blog.excerpt = excerpt.trim();
    if (content !== undefined) blog.content = content;

    if (req.body.category !== undefined) {
      const category = parseStringArray(req.body.category);

      if (
        category.length === 0 ||
        category.some((categoryId) =>
          !mongoose.Types.ObjectId.isValid(categoryId)
        )
      ) {
        return res.status(400).json({
          message: "Invalid categories",
        });
      }

      const validCategories = await Category.countDocuments({
        _id: { $in: category },
      });

      if (validCategories !== new Set(category).size) {
        return res.status(400).json({
          message: "One or more categories do not exist",
        });
      }

      blog.category = category.map(
        (categoryId) => new mongoose.Types.ObjectId(categoryId)
      );
    }

    if (req.body.tags !== undefined) {
      blog.tags = parseStringArray(req.body.tags);
    }

    if (author !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).json({
          message: "Invalid author ID",
        });
      }

      const writer = await User.findById(author);

      if (!writer || !writer.isWriter) {
        return res.status(400).json({
          message: "Selected author is not a valid writer",
        });
      }

      blog.author = new mongoose.Types.ObjectId(author);
    }

    if (reading !== undefined) {
      blog.reading = Number(reading);
    }

    if (isPublished !== undefined) {
      blog.isPublished = isPublished === "true";
    }

    // Preserve the existing thumbnail unless a new image is uploaded
    if (req.file) {
      blog.thumbnail = req.file.path;
    }
    if (reading !== undefined) {
        const readingValue = Number(reading);

        if (!Number.isFinite(readingValue) || readingValue <= 0) {
            return res.status(400).json({
            message: "Reading time must be a positive number",
            });
        }

        blog.reading = readingValue;
    }

    if (isFeatured !== undefined) {
        blog.isFeatured = isFeatured === "true";
    }

    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return res.status(500).json({
      message: "Failed to update blog",
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog) {
            return res.status(404).json({ message : "Blog not found" });
        }

        res.status(200).json({
            message : "Blog deleted Successfully",
        })
    }catch (error) {
        res.status(500).json({ message : "Server error" });
    }
};