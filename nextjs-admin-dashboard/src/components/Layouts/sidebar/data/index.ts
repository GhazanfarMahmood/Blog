import { permission, title } from "process";
import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url : "/",
        permission: "dashboard",
        items: [],
      },
      {
        title : "Post",
        icon : Icons.PostIcon,
        permission: "post",
        items : [
          {
            title : "All Posts", 
            url : "/post/all-posts"
          }, 
          {
            title : "Create Post",
            url : "/post/create-post"
          }
        ],
      },
      {
        title : "Category",
        icon : Icons.CategoryIcon,
        permission: "categories",
        items: [
          {
            title : "All Categories",
            url : "/category/all-categories",
          },
          {
            title : "Create Category",
            url : "/category/create-category"
          }
        ]
      },
      {
        title : "Writer",
        url : "/writer",
        icon : Icons.ToolIcon,
        permission: "writers",
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        permission: "profile",
        items: [],
      },
      {
        title : "Comments",
        url : "/comments",
        icon : Icons.CommentIcon,
        permission: "comments",
        items : [],
      },
      {
        title : "Newsletter",
        url : "/newsletter",
        icon : Icons.EnvelopeIcon,
        permission: "newsletter",
        items : [],
      },
      {
        title : "Contact Us",
        url : "/contact",
        icon : Icons.User,
        permission : "contact",
        items : [],
      },
      {
        title : "About Us",
        url : "/about",
        icon : Icons.MediaIcon,
        permission : "about",
        items : [],
      },
      {
        title : "Home Content",
        url : "/home-content",
        icon : Icons.ToolIcon,
        permission : "home",
        items : [],
      },
      {
        title : "Settings",
        url : "/settings",
        icon : Icons.SettingIcons,
        permission: "settings",
        items : [],
      },
      {
        title : "Users",
        icon : Icons.User,
        permission : "users",
        items : [
          {
            title : "All Users",
            url : "/users/all-users",
          },
          {
            title : "Create User",
            url : "/users/create-user",
          },
        ],
      },
    ],
  },
];
