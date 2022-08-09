import clsx from 'clsx';

import IconHeart from '@/components/Icon/IconHeart';

interface PostCommentProps {
    postId?: string;
    comment?: string;
    commentBy?: string;
}

const PostComment = ({ comment, commentBy, postId }: PostCommentProps) => {
    const isLiked = true;

    return (
        <div className={clsx('flex')}>
            <div className={clsx('font-medium mr-2 h-full', 'cursor-pointer', 'hover:underline')}>{commentBy}</div>
            <p>{comment}</p>
            <IconHeart
                onClick={() => {}}
                className={clsx('h-3.5 flex-shrink-0 ml-auto', 'cursor-pointer', !isLiked && 'hover:opacity-60')}
            />
        </div>
    );
};

export default PostComment;
