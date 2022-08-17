import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
// import { PostFragment } from '~/types/generated';
// import { postActions } from '~/redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { followUserStart } from '@/redux/slices/userSlice';

import { avatar } from '@/assets/images';
import Skeleton from '@/components/Skeleton';
import { Post } from '@/core/models/Post';
import { ReduxStateType } from '@/redux/types';
import SpinnerRing from '@/components/Spinner/SpinnerRing';

const PostHeader = (post: Post) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status } = useAppSelector((state) => state.post);
    // const hasFollowBtn = !isFollowed && currentUser._id !== post.user._id;

    return (
        <div className="flex-between py-3 px-4">
            <div className="flex items-center">
                <Skeleton
                    onClick={() => {
                        navigate(`/${post.username}`);
                    }}
                    rounded
                    objectFit="cover"
                    className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
                    src={post.avatar ?? avatar}
                    alt="Avatar"
                />
                <span
                    onClick={() => {
                        navigate(`/${post.username}`);
                    }}
                    className={clsx('text-sm font-medium mr-3', 'cursor-pointer')}
                >
                    {post.username}
                </span>
                {post.isFollow ? (
                    <div className="text-xs font-bold">Following</div>
                ) : (
                    <button
                        onClick={() => {
                            dispatch(followUserStart(post.userId));
                        }}
                        className={clsx('btn text-sm-1', 'text-primary')}
                    >
                        Follow
                    </button>
                )}
            </div>
            <FontAwesomeIcon
                // ba cham ne
                onClick={() => {
                    // dispatch(postActions.setSelectedPost(post));
                }}
                className="cursor-pointer"
                icon={faEllipsis}
            />
        </div>
    );
};

export default PostHeader;
