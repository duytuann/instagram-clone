import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { LIMITS } from '@/helpers/consts';
import { ReduxStateType } from '@/redux/types';
import { useAppDispatch, useAppSelector, useIntersectionObserver } from '@/hooks';
import { createCommentStart, clearPostDetail } from '@/redux/slices/postSlice';
import { setShowModalPostDetail } from '@/redux/slices/globalSlice';
import { displayLikeCounts } from '@/helpers/format';
import { calculateElapsedTime } from '@/helpers/time';
import { SpinnerRing } from '@/components/Spinner';
import Skeleton from '@/components/Skeleton';
import Actions from '@/components/Actions';
import CommentField from '@/components/CommentField';
import DetailComment from '@/components/Modal/ModalPostDetail/DetailComment';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { avatar } from '@/assets/images';

const ModalPostDetail = () => {
    const [caption, setCaption] = useState<string>('');
    const {
        data: { currentPostDetail, currentComment },
        status,
    } = useAppSelector((state) => state.post);

    // Fix duplicate requests
    const calledCursorsRef = useRef<Array<string | null>>([]);

    const { observerRef, containerObserverRef, isIntersecting } = useIntersectionObserver({
        rootMargin: '300px',
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const hasFollowBtn = !currentPostDetail.isFollowed;

    const handleCreateComment = () => {
        // if (createCommentLoading) return;

        dispatch(
            createCommentStart({
                postId: currentPostDetail.postId,
                commentText: caption,
            }),
        );

        setCaption('');
        // (clearPostDetail());

        // add comment to list
    };

    const handleVisitProfile = (username: string) => {
        navigate(`/${username}`);

        dispatch(setShowModalPostDetail(false));
        dispatch(clearPostDetail());

        setCaption('');
    };

    // Fetch comments
    useEffect(() => {
        // fetch new data
    }, []);

    return (
        <ModalWrapper
            closeHandler={() => {
                dispatch(setShowModalPostDetail(false));
                dispatch(clearPostDetail());
            }}
            className={clsx('flex w-modal-w h-screen', currentPostDetail.mediaPath == null ? 'w-max' : 'lg:w-[1150px]')}
        >
            {currentPostDetail.mediaPath != null && (
                <Skeleton
                    objectFit="cover"
                    className={clsx('hidden lg:block w-3/5 min-h-full border-r border-line', 'bg-white')}
                    src={currentPostDetail.mediaPath}
                />
            )}

            <div
                className={clsx(
                    'flex flex-col text-sm-1 h-full',
                    'bg-white',
                    currentPostDetail.mediaPath == null ? 'lg:w-max rounded-lg mx-auto' : 'lg:w-2/5',
                )}
            >
                <div className="flex items-center px-4 py-3 border-b border-line flex-shrink-0">
                    <Skeleton
                        // online={checkOnline(user._id)}
                        src={currentPostDetail.avatar ?? avatar}
                        rounded
                        className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
                        objectFit="cover"
                    />

                    <span className={clsx('font-medium mr-3', 'cursor-pointer')}>{currentPostDetail?.username}</span>

                    {hasFollowBtn && (
                        <button
                            onClick={() => {}} // handle follow
                            className={clsx('btn', 'text-primary', 'cursor-pointer')}
                        >
                            {status === ReduxStateType.LOADING ? <SpinnerRing className="text-base-gray" /> : 'Follow'}
                        </button>
                    )}

                    <button onClick={() => {}} className="btn ml-auto">
                        <FontAwesomeIcon className="text-lg" icon={faEllipsis} />
                    </button>
                </div>

                <div ref={containerObserverRef} className="px-4 overflow-y-auto">
                    <div className="group flex items-center py-2">
                        <Skeleton
                            onClick={() => handleVisitProfile(currentPostDetail.username)}
                            src={currentPostDetail.avatar ?? avatar}
                            rounded
                            className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
                            objectFit="cover"
                        />
                        <div className="leading-normal">
                            <span
                                onClick={() => handleVisitProfile(currentPostDetail.username)}
                                className={clsx('font-medium mr-1', 'cursor-pointer select-none')}
                            >
                                {currentPostDetail.username}
                            </span>
                            <p className="inline">{currentPostDetail.caption}</p>
                            <span className={clsx('block mt-0.5 text-xs', 'text-base-gray')}>
                                {calculateElapsedTime(currentPostDetail.created)}
                            </span>
                        </div>
                    </div>

                    {currentComment.map((comment: any) => (
                        <DetailComment
                            onVisitProfile={handleVisitProfile}
                            key={comment.commentId}
                            postId={currentPostDetail.postId}
                            comment={comment}
                        />
                    ))}

                    <div ref={observerRef} />

                    {/* {getCommentsLoading && (
                        <div className="mt-3 mb-6 overflow-hidden">
                            <SpinnerRing className="mx-auto" />
                        </div>
                    )}  */}
                </div>

                <div className="flex-shrink-0 mt-auto px-4 border-t border-line py-3">
                    {/* <Actions post={selectedPost!} />

                    <div className="mt-3">
                        {reactions.length === 0 ? (
                            <span>
                                Be the first to <span className={clsx('font-medium', 'cursor-pointer')}>like this</span>
                            </span>
                        ) : (
                            <span className="font-medium">{displayLikeCounts(reactions, 'like')}</span>
                        )}
                    </div> */}

                    <div className={clsx('text-xs-1 mt-2', 'text-base-gray')}>4 DAYS AGO</div>
                </div>

                <CommentField
                    // loading={createCommentLoading}
                    onSubmit={handleCreateComment}
                    className="flex-shrink-0"
                    caption={caption}
                    onSetCaption={setCaption}
                />
            </div>
        </ModalWrapper>
    );
};

export default ModalPostDetail;
