import { memo, useState } from 'react';

import clsx from 'clsx';

import { PostFragment, useCreateCommentMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { commentActions } from '~/redux/slices/commentSlice';
import { postActions } from '~/redux/slices/postSlice';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostPhoto from './PostPhoto';
import CommentField from '../CommentField';

const Post = (props: PostFragment) => {
    const { _id: postId } = props;

    const [caption, setCaption] = useState<string>('');

    const [createComment, { loading: createCommentLoading }] = useCreateCommentMutation();
    const dispatch = useStoreDispatch();

    const handleCreateComment = async () => {
        const response = await createComment({
            variables: {
                caption,
                postId,
            },
        });

        const data = response.data?.createComment;

        if (!data?.success) return;

        dispatch(
            postActions.increaseCommentCounts({
                postId,
            }),
        );
        setCaption('');

        dispatch(commentActions.addDisplayedComment({ postId, comment: data.comment! }));
    };

    return (
        <div className={clsx('border-1 border-line', 'bg-white')}>
            <PostHeader {...props} />
            <PostPhoto {...props} />
            <PostBody {...props} />
            <CommentField
                loading={createCommentLoading}
                onSubmit={handleCreateComment}
                caption={caption}
                onSetCaption={setCaption}
            />
        </div>
    );
};

export default memo(Post);
