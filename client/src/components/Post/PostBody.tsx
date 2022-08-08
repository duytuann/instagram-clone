import clsx from 'clsx';

import { displayLikeCounts } from '@/helpers/format';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { calculateElapsedTime } from '@/helpers/time';
import PostComment from '@/components/Post/PostComment';
import Actions from '@/components/Actions';
import { Post } from '@/core/models/Post';

const PostBody = (post: Post) => {
    // const { showModal } = useModalContext();
    // const { comments } = useCommentSelector();

    const dispatch = useAppDispatch();

    // const showModalPostDetail = () => {
    //     dispatch(postActions.setSelectedPost(post));
    //     showModal(MODAL_TYPES.POST_DETAIL);
    // };

    return (
        <div className="px-4 pt-4 pb-3">
            <Actions onComment={() => {}} post={post} />

            <div className="flex flex-col gap-y-2 text-sm-1 mt-5">
                <span className={clsx('font-medium', 'cursor-pointer select-none')}>
                    {displayLikeCounts([100], 'like')}
                </span>

                <div className="flex">
                    <span className={clsx('font-medium mr-2', 'cursor-pointer select-none')}>
                        {'usernameplacehoder'}
                    </span>
                    <p>{post.Caption}</p>
                </div>

                {5 > 0 && (
                    <span
                        onClick={() => {}} // show post detail
                        className={clsx('text-base-gray', 'cursor-pointer select-none')}
                    >
                        View all {5} comments
                    </span>
                )}

                <div className="space-y-2">
                    {/* {(comments[post._id]?.displayedComments ?? []).map((comment) => (
                        <PostComment key={comment._id} postId={post._id} comment={comment} />
                    ))} */}
                    <PostComment key={1} postId={'1'} comment={'Comment placeholder'} />
                </div>

                <span className={clsx('uppercase text-xs-1', 'text-base-gray', 'cursor-pointer select-none')}>
                    {calculateElapsedTime(post.LastModified)}
                </span>
            </div>
        </div>
    );
};

export default PostBody;
