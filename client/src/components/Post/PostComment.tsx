import clsx from 'clsx';

// import { useComment } from '@/hooks';
import IconHeart from '@/components/Icon/IconHeart';

interface PostCommentProps {
    postId: string;
    comment: string;
}

const PostComment = ({ comment, postId }: PostCommentProps) => {
    // const { user, caption } = comment;

    // const { isLiked, reactComment } = useComment(comment, postId);
    const isLiked = true;
    const reactComment = () => {};

    return (
        <div className={clsx('flex')}>
            <div className={clsx('font-medium mr-2 h-full', 'cursor-pointer', 'hover:underline')}>
                {'usename placeholder'}
            </div>
            <p>{'caption placeholder'}</p>
            <IconHeart
                onClick={reactComment}
                active={isLiked}
                className={clsx('h-3.5 flex-shrink-0 ml-auto', 'cursor-pointer', !isLiked && 'hover:opacity-60')}
            />
        </div>
    );
};

export default PostComment;
