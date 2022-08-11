import clsx from 'clsx';

import { likePostStart, unlikePostStart, putLike, putUnlike } from '@/redux/slices/postSlice';
import { useAppDispatch } from '@/hooks';
import IconComment from '@/components/Icon/IconComment';
import IconHeart from '@/components/Icon/IconHeart';
import IconSave from '@/components/Icon/IconSave';
import IconShare from '@/components/Icon/IconShare';
import { Post } from '@/core/models/Post';

interface ActionsProps {
    post: Post;
    className?: string;
    onComment?: () => void;
}

const Actions = ({ className, post, onComment }: ActionsProps) => {
    const dispatch = useAppDispatch();
    const isLiked = post.isLiked;

    return (
        <div className={clsx('flex-between', className)}>
            <div className={clsx('flex items-center gap-x-3')}>
                <IconHeart
                    onClick={
                        !isLiked
                            ? () => {
                                  dispatch(likePostStart(post.postId));
                                  dispatch(putLike(post.postId));
                              }
                            : () => {
                                  dispatch(unlikePostStart(post.postId));
                                  dispatch(putUnlike(post.postId));
                              }
                    }
                    className={clsx('cursor-pointer', !isLiked && 'hover:opacity-60')}
                    active={isLiked}
                />
                <IconComment onClick={onComment} className={clsx('cursor-pointer', 'hover:opacity-60')} />
                <IconShare className={clsx('cursor-pointer', 'hover:opacity-60')} />
            </div>
            <IconSave className={clsx('cursor-pointer', 'hover:opacity-60')} />
        </div>
    );
};

export default Actions;
