import { useEffect } from 'react';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { setShowModalPostDetail } from '@/redux/slices/globalSlice';
import { useIntersectionObserver, useAppDispatch, useAppSelector } from '@/hooks';
import { getDetailByPostIdStart, getCommentOfPostStart } from '@/redux/slices/postSlice';
import IconHeart from '@/components/Icon/IconHeart';
import IconPhotoVideo from '@/components/Icon/IconPhotoVideo';
import Skeleton from '@/components/Skeleton';
// import photo from '@/assets/photo.png';

interface ProfilePostsProps {
    userId?: string;
}

const ProfilePosts = ({ userId }: ProfilePostsProps) => {
    const {
        data: { currentProfile },
    } = useAppSelector((state) => state.user);
    const {
        data: { commentPaging },
    } = useAppSelector((state) => state.post);

    const { isIntersecting, observerRef } = useIntersectionObserver({
        rootMargin: '300px',
    });

    const dispatch = useAppDispatch();

    if (currentProfile?.previews?.length === 0)
        return (
            <div className={clsx('text-center mt-24')}>
                <IconPhotoVideo className={clsx('mx-auto', 'text-base-gray')} />
                <p className={clsx('text-2xl mt-3', 'text-base-gray')}>No Posts Yet</p>
            </div>
        );

    return (
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-7 mt-10">
            {currentProfile?.previews?.map((post: any) => (
                <div
                    key={post.postId}
                    onClick={() => {
                        dispatch(getDetailByPostIdStart(post.postId));
                        dispatch(
                            getCommentOfPostStart({
                                PageNumber: commentPaging.pageNumber,
                                PageSize: commentPaging.pageSize,
                                PostId: post.postId,
                            }),
                        );
                        dispatch(setShowModalPostDetail(true));
                    }}
                    className={clsx('relative', 'btn group h-36 md:h-64 lg:h-[293px]')}
                >
                    <Skeleton objectFit="cover" src={post.mediaPath} alt="Post" />
                    <button
                        className={clsx(
                            'absolute inset-0',
                            'hidden group-hover:flex-center gap-x-8',
                            'text-white bg-[rgba(0,0,0,0.3)]',
                            'cursor-pointer',
                        )}
                    >
                        <div className="flex items-center">
                            <IconHeart white className="w-5 mr-2" />
                            <span className={clsx('font-medium text-sm')}>{post.likeCount}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faComment} className="w-5 mr-2" />
                            <span className={clsx('font-medium text-sm')}>{post.commentCount}</span>
                        </div>
                    </button>
                </div>
            ))}
            <div ref={observerRef} />
        </div>
    );
};

export default ProfilePosts;
