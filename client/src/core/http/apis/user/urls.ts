export const signUpUrl = '/SignUp';
export const Follow = (UserId: string) => `/Follow?UserId=${UserId}`;
export const Unfollow = (UserId: string) => `/UnFollow?UserId=${UserId}`;
export const GetProfileUrl = (username: string) => `GetProfile?UserName=${username}`;