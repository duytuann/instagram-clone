import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

// import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
// import { PostFragment } from '~/types/generated';
// import { postActions } from '~/redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
//import { useFollowUser, useUser } from '~/hooks';

import { avatar } from '@/assets/images';
import Skeleton from '@/components/Skeleton';
import SpinnerRing from '@/components/Spinner/SpinnerRing';

const PostHeader = (post: PostFragment) => {
    const { user } = post;

    const { showModal } = useModalContext();

    const { visitProfile, checkOnline } = useUser();
    const { isFollowed, followUserLoading, currentUser, followUser } = useFollowUser(user);
    const dispatch = useStoreDispatch();

    const hasFollowBtn = !isFollowed && currentUser._id !== post.user._id;

    const onVisitProfile = () => visitProfile(post.user.username);

    return (
        <div className="flex-between py-3 px-4">
            <div className="flex items-center">
                <Skeleton
                    online={checkOnline(user._id)}
                    onClick={onVisitProfile}
                    rounded
                    objectFit="cover"
                    className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
                    src={user.avatar} // ?? avatar.src
                    alt="Avatar"
                />
                <span onClick={onVisitProfile} className={clsx('text-sm font-medium mr-3', 'cursor-pointer')}>
                    {user.username}
                </span>
                {hasFollowBtn &&
                    (followUserLoading ? (
                        <SpinnerRing className="w-10 h-10" />
                    ) : (
                        <button onClick={() => followUser('follow')} className={clsx('btn text-sm-1', 'text-primary')}>
                            Follow
                        </button>
                    ))}
            </div>
            <FontAwesomeIcon
                onClick={() => {
                    showModal(MODAL_TYPES.POST_ACTIONS);
                    dispatch(postActions.setSelectedPost(post));
                }}
                className="cursor-pointer"
                icon={faEllipsis}
            />
        </div>
    );
};

export default PostHeader;
