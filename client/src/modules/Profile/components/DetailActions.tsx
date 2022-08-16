import { useRouter } from 'next/router';

import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { ROUTES } from '~/constants';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useCreateConversationMutation, UserFragment } from '~/types/generated';
import { useFollowUser } from '~/hooks';
import { useStoreDispatch } from '~/redux/store';
import { authActions } from '~/redux/slices/authSlice';

import { SpinnerRing } from '~/components/Spinner';
import IconFollowing from '~/components/Icon/IconFollowing';

interface DetailActionsProps {
  user: UserFragment;
}

const DetailActions = ({ user }: DetailActionsProps) => {
  const { showModal } = useModalContext();

  const { isFollowed, followUserLoading, currentUser, followUser } = useFollowUser(user);
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const [createConversation, { loading: createConversationLoading }] =
    useCreateConversationMutation();

  const handleGoToMessage = async () => {
    if (createConversationLoading) return;

    await createConversation({
      variables: {
        receiverId: user._id,
      },
    });

    router.push(ROUTES.INBOX);
  };

  if (currentUser._id === user._id) return null;

  let buttons = null;

  if (isFollowed)
    buttons = (
      <div className='flex ml-auto gap-x-3 h-8'>
        <button
          onClick={handleGoToMessage}
          className='btn h-full w-[83.5px] border-1 font-medium border-line text-sm'
        >
          {createConversationLoading ? <SpinnerRing className='text-base-gray' /> : 'Message'}
        </button>
        <button
          onClick={() => {
            dispatch(authActions.setSelectedUser(user));
            showModal(MODAL_TYPES.UNFOLLOW);
          }}
          className='btn h-full px-6 border-1 border-line'
        >
          <IconFollowing />
        </button>
        <button className='btn h-full px-3 border-1 border-line'>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    );
  else
    buttons = (
      <button
        onClick={() => followUser('follow')}
        className={clsx('btn w-20 h-8 text-sm ml-10 font-medium', 'text-white bg-primary')}
      >
        {followUserLoading ? <SpinnerRing className='text-white' /> : 'Follow'}
      </button>
    );

  return (
    <div
      className={clsx('flex items-center mt-5 md:mt-0 justify-center', isFollowed && 'md:ml-auto')}
    >
      {buttons}
      <button className='btn py-1.5 px-5'>
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
    </div>
  );
};

export default DetailActions;
