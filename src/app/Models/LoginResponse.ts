export type RefreshToken = {
  userId: number;
  userRoles: string[];
  userName: string;
  token: string;
  expireDate: string; // Consider using a Date object if you plan to manipulate the date
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: RefreshToken;
};
export function isLoginResponse(obj: any): obj is LoginResponse {
  return (
    obj &&
    typeof obj === 'object' &&
    'accessToken' in obj &&
    typeof obj.accessToken === 'string' &&
    'refreshToken' in obj &&
    typeof obj.refreshToken === 'object' &&
    'userId' in obj.refreshToken &&
    typeof obj.refreshToken.userId === 'number' &&
    'userRoles' in obj.refreshToken &&
    Array.isArray(obj.refreshToken.userRoles) &&
    obj.refreshToken.userRoles.every((role: any) => typeof role === 'string') &&
    'userName' in obj.refreshToken &&
    typeof obj.refreshToken.userName === 'string' &&
    'token' in obj.refreshToken &&
    typeof obj.refreshToken.token === 'string' &&
    'expireDate' in obj.refreshToken &&
    typeof obj.refreshToken.expireDate === 'string'
  );
}
