import { useState } from 'react';
import clsx from 'clsx';

import { Post } from '@/core/models/Post';
import { useDoubleTab } from '@/hooks';
import Skeleton from '@/components/Skeleton';
import { useAppDispatch } from '@/hooks';
import { likePostStart, putLike } from '@/redux/slices/postSlice';
import IconHeart from '@/components/Icon/IconHeart';

const PostPhoto = (post: Post) => {
    const dispatch = useAppDispatch();
    const [isHearted, setIsHearted] = useState<boolean>(false);

    const { mediaPath, caption } = post;

    // const { isLiked, reactPost } = usePost(post);
    const [doubleTab] = useDoubleTab();

    const handleReactPost = () => {
        const callback = () => {
            setIsHearted(true);

            if (!post.isLiked) {
                dispatch(likePostStart(post.postId));
                dispatch(putLike(post.postId));
            }
        };

        doubleTab(callback);
    };

    if (!mediaPath) return <h2 className={clsx('px-4 text-2xl')}>{caption}</h2>;

    return (
        <div className={'relative'} onClick={handleReactPost}>
            <div className="abs-center z-10">
                {isHearted && (
                    <IconHeart
                        white
                        onAnimationEnd={() => setIsHearted(false)}
                        className={clsx('w-20 h-20 drop-shadow-xl', 'animate-like-feed')}
                    />
                )}
            </div>
            <Skeleton src={mediaPath} alt="Thumbnail" draggable={false} />
        </div>
    );
};

export default PostPhoto;
