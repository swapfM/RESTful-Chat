export interface AuthServiceProps {
  login: (username: string, password: string) => unknown;
  isLoggedIn: boolean;
  logout: () => void;
  refreshAccessToken: () => Promise<void>; // asynchronous function
}
