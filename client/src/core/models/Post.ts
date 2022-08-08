export interface Post {
    postId?: string;
    userId?: string;
    username?: string;
    created?: string;
    lastModified?: string;
    caption?: string;
    mediaPath?: string;
    likeCount?: number;
    comments?: any;
    isLiked?: boolean;
    isFollowed?: boolean;
}
