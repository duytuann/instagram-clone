import clsx from 'clsx';

import { displayLikeCounts } from '@/helpers/format';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { calculateElapsedTime } from '@/helpers/time';
import PostComment from '@/components/Post/PostComment';
import { setShowModalPostDetail } from '@/redux/slices/globalSlice';
import { getDetailByPostIdStart } from '@/redux/slices/postSlice';
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
                    <span className={clsx('font-bold mr-2', 'cursor-pointer select-none')}>{post.username}</span>
                    <p>{post.caption}</p>
                </div>

                {post.comments.length > 0 && (
                    <span
                        onClick={() => {
                            dispatch(getDetailByPostIdStart(post.postId));
                            dispatch(setShowModalPostDetail(true));
                        }}
                        className={clsx('text-base-gray', 'cursor-pointer select-none')}
                    >
                        View all {post.comments.length} comments
                    </span>
                )}
                {/* show Preview Comment */}
                {/* <div className="space-y-2">
                    {post.comments.length < 5
                        ? post.comments.map((comment) => (
                              <PostComment key={comment.commentId} postId={post.postId} comment={comment.commentText} commentBy = {comment.commentBy}/>
                          ))
                        : null}
                </div> */}
                <span className={clsx('uppercase text-xs-1', 'text-base-gray', 'cursor-pointer select-none')}>
                    {calculateElapsedTime(post.lastModified)}
                </span>
            </div>
        </div>
    );
};

export default PostBody;
