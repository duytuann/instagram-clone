export const GetAllUrl = '/GetAll';
export const CreateUrl = '/Create';
export const UpdateUrl = '/Update';
export const DeleteUrl = '/Delete';
export const CommentUrl = '/Comment';
export const Like = (postId: string) => `/Like?postId=${postId}`;
export const Unlike = (postId: string) => `/Unlike?postId=${postId}`;
export const GetDetailByPostId = (postId: string) => `/GetDetailByPostId?postId=${postId}`;
