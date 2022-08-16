export interface CreatePostParams {
    formData: FormData;
}

export interface CreateComment {
    commentText: string;
    postId: string;
}

export interface GetCommentOfPostParams {
    PostId: string;
    PageNumber: number;
    PageSize: number;
}
