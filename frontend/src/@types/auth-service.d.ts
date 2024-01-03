export interface AuthServiceProps {
  register: (username: string, password: string) => Promise<unknown>;
  login: (username: string, password: string) => unknown;
  isLoggedIn: boolean;
  logout: () => void;
  refreshAccessToken: () => Promise<void>; // asynchronous function
}
