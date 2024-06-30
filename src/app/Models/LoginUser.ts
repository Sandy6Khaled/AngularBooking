export type LoginUser = {
  email: string;
  password: string;
};

export type LogoutRequest={
  refreshToken: string;
}