import { useNavigate } from 'react-router-dom';
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { routes } from '@/routes/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {} from '@/redux/slices/authSlice';
import { SpinnerRing } from '@/components/Spinner';
import IconFollowing from '@/components/Icon/IconFollowing';

const DetailActions = () => {
    // const { isFollowed, followUserLoading, currentUser, followUser } = useFollowUser(user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        data: { currentProfile },
    } = useAppSelector((state) => state.user);

    const {
        data: { user },
    } = useAppSelector((state) => state.auth);
    const isMe = currentProfile.userId === user.userId;

    // const [createConversation, { loading: createConversationLoading }] = useCreateConversationMutation();

    const handleGoToMessage = () => {
        // if (createConversationLoading) return;
        navigate(routes.inbox);
    };

    if (isMe) return null;

    let buttons = null;
    let isFollowed = false;

    if (isFollowed)
        buttons = (
            <div className="flex ml-auto gap-x-3 h-8">
                <button
                    onClick={handleGoToMessage}
                    className="btn h-full w-[83.5px] border-1 font-medium border-line text-sm"
                >
                    {/* {createConversationLoading ? <SpinnerRing className="text-base-gray" /> : 'Message'} */}
                </button>
                <button
                    onClick={() => {
                        // dispatch(authActions.setSelectedUser(user));
                        // showModal(MODAL_TYPES.UNFOLLOW);
                    }}
                    className="btn h-full px-6 border-1 border-line"
                >
                    <IconFollowing />
                </button>
                <button className="btn h-full px-3 border-1 border-line">
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
        );
    else
        buttons = (
            <button
                onClick={() => {}}
                className={clsx('btn w-20 h-8 text-sm ml-10 font-medium', 'text-white bg-primary')}
            >
                {/* {followUserLoading ? <SpinnerRing className="text-white" /> : 'Follow'} */}
            </button>
        );

    return (
        <div className={clsx('flex items-center mt-5 md:mt-0 justify-center', isFollowed && 'md:ml-auto')}>
            {buttons}
            <button className="btn py-1.5 px-5">
                <FontAwesomeIcon icon={faEllipsis} />
            </button>
        </div>
    );
};

export default DetailActions;
