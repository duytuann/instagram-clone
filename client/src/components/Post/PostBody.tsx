import { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { CommentFragment, PostFragment } from '~/types/generated';
import { displayLikeCounts } from '~/helpers/format';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';
import { useCommentSelector } from '~/redux/selectors';
import { calculateElapsedTime } from '~/helpers/time';
import PostComment from './PostComment';
import Actions from '../Actions';

export type SetCommentsDispatch = Dispatch<SetStateAction<CommentFragment[]>>;

const PostBody = (post: PostFragment) => {
  const { reactions, user, caption, commentCounts } = post;

  const { showModal } = useModalContext();
  const { comments } = useCommentSelector();

  const dispatch = useStoreDispatch();

  const showModalPostDetail = () => {
    dispatch(postActions.setSelectedPost(post));
    showModal(MODAL_TYPES.POST_DETAIL);
  };

  return (
    <div className='px-4 pt-4 pb-3'>
      <Actions onComment={showModalPostDetail} post={post} />

      <div className='flex flex-col gap-y-2 text-sm-1 mt-5'>
        <span className={clsx('font-medium', 'cursor-pointer select-none')}>
          {displayLikeCounts(reactions, 'like')}
        </span>

        <div className='flex'>
          <span className={clsx('font-medium mr-2', 'cursor-pointer select-none')}>
            {user.username}
          </span>
          <p>{caption}</p>
        </div>

        {commentCounts > 0 && (
          <span
            onClick={showModalPostDetail}
            className={clsx('text-base-gray', 'cursor-pointer select-none')}
          >
            View all {commentCounts} comments
          </span>
        )}

        <div className='space-y-2'>
          {(comments[post._id]?.displayedComments ?? []).map((comment) => (
            <PostComment key={comment._id} postId={post._id} comment={comment} />
          ))}
        </div>

        <span
          className={clsx('uppercase text-xs-1', 'text-base-gray', 'cursor-pointer select-none')}
        >
          {calculateElapsedTime(post.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default PostBody;
