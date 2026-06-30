export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
}

export interface PostFormValues {
  title: string;
  body: string;
  category?: string;
  tags?: string;
}

export interface PostsQuery {
  page: number;
  limit: number;
  search?: string;
}
