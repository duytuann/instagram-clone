export interface Comment {
    commentId?: string;
    postId?: string;
    userId?: string;
    commentText?: string;
    commentBy?: string;
    created?: string;
    lastModified?: string;
}

export interface Post {
    postId: string;
    userId?: string;
    username?: string;
    created?: string;
    lastModified?: string;
    caption?: string;
    mediaPath?: string;
    likes: number;
    comments: Comment[];
    isLiked?: boolean;
    isFollow?: boolean;
}

export interface PostDetail {
    postId: string;
    userId: string;
    username: string;
    mediaPath: string;
    likes: number;
    caption: string;
    isLiked: boolean;
    comments: Comment[];
    lastModified?: string;
}
