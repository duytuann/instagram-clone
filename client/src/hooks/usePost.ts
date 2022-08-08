import { useAppDispatch } from '@/hooks';
import { Post } from '@/core/models/Post';
import { likePostStart, unlikePostStart } from '@/redux/slices/postSlice';

interface UsePostReturn {
    isLiked?: boolean;
    reactPost: () => void;
}

export const usePost = (post: Post): UsePostReturn => {
    const dispatch = useAppDispatch();

    const isLiked = post.IsLiked;

    const reactPost = () => {
        if (isLiked) {
            dispatch(unlikePostStart(post.PostId));
            post.IsLiked = !post.IsLiked;
        } else {
            dispatch(likePostStart(post.PostId));
            post.IsLiked = !post.IsLiked;
        }
    };

    return { isLiked, reactPost };
};
