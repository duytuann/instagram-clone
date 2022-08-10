export const ACCESS_TOKEN_KEY = 'access_token';

export const REFRESH_ACCESS_TOKEN_KEY = 'refresh_token';

export const API_REQUEST_TIMEOUT = 200000; // 20s

export const RESPONSE_CODE = {
    TOKEN_EXPIRED: 401,
};

export const LIMITS = {
    POSTS: 5,
    COMMENTS: 5,
    SEARCH_USER: 20,
    CONVERSATIONS: 10,
    MESSAGES: 15,
    SUGGESTED_PEOPLE: 15,
} as const;
