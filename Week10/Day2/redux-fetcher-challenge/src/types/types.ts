export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface DataState {
  items: any[];
  loading: boolean;
  error: string | null;
}