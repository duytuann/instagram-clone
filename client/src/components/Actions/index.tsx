import clsx from 'clsx';

import { usePost } from '@/hooks';
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
    // const { isLiked, reactPost } = usePost(post);
    const isLiked = true;
    const reactPost = () => {};

    return (
        <div className={clsx('flex-between', className)}>
            <div className={clsx('flex items-center gap-x-3')}>
                <IconHeart
                    onClick={reactPost}
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
