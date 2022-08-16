import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { displayLikeCounts } from '@/helpers/format';
// import { useComment, useUser } from '@/hooks';
import { calculateElapsedTime } from '@/helpers/time';

import IconHeart from '@/components/Icon/IconHeart';
import Skeleton from '@/components/Skeleton';
import { avatar } from '@/assets/images';

interface DetailCommentProps {
    comment: any;
    postId: string;
    onVisitProfile: (username: string) => void;
}

const DetailComment = ({ comment, postId, onVisitProfile }: DetailCommentProps) => {
    const handleVisitProfile = () => onVisitProfile(comment.username);
    const isLiked = true;

    return (
        <div className="group flex py-2">
            <Skeleton
                onClick={() => onVisitProfile}
                src={comment.avatar ?? avatar}
                rounded
                className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
                objectFit="cover"
            />
            <div className="leading-normal">
                <span onClick={handleVisitProfile} className={clsx('font-medium mr-1', 'cursor-pointer select-none')}>
                    {comment.username}
                </span>
                <p className="inline">{comment.commentText}</p>
                <div className={clsx('flex items-center gap-x-3 mt-2', 'text-base-gray')}>
                    <span>{calculateElapsedTime(comment.createdAt)}</span>
                    {/* <button className={clsx('font-medium', 'cursor-pointer')}>
                        {displayLikeCounts(comment.reactions, 'like')}
                    </button> */}
                    <button className={clsx('font-medium', 'cursor-pointer')}>Reply</button>
                    <FontAwesomeIcon
                        // onClick={onSelectOptions}
                        className={clsx('lg:hidden group-hover:block', 'cursor-pointer')}
                        icon={faEllipsis}
                    />
                </div>
            </div>
            <IconHeart
                onClick={() => {}}
                active={isLiked}
                className={clsx('w-4 flex-shrink-0 ml-auto', 'cursor-pointer', !isLiked && 'hover:opacity-60')}
            />
        </div>
    );
};

export default DetailComment;
