export type Note = {
  id: string;
  title: string;
  content: string;
  color?: string;
  updatedAt?: number;
};

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type AuthInfo = {
  isLoggedIn: boolean;
  userName?: string;
};
