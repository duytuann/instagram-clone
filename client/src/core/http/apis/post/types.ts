export interface CreatePostParams {
    formData: FormData;
}

export interface CreateComment {
    commentText: string;
    postId: string;
}
