export interface Post {
    PostId?: string;
    UserId?: string;
    Username?: string;
    Created?: string;
    LastModified?: string;
    Caption?: string;
    MediaPath?: string;
    LikeCount?: number;
    CommentCount?: number;
    IsLiked?: boolean;
    IsFollowed?: boolean;
}
