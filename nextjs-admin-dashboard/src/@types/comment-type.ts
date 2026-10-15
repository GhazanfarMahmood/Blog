
export interface Comment {
  _id: string;
  blog: {
    _id: string;
    title: string;
    slug: string;
  } | null;
  name: string;
  email: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}
