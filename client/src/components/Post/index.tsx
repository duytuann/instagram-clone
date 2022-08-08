import { memo, useState } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@/hooks';
// import { commentActions } from '~/redux/slices/commentSlice';
// import { postActions } from '~/redux/slices/postSlice';
import { Post as _Post } from '@/core/models/Post';
import PostBody from '@/components/Post/PostBody';
import PostHeader from '@/components/Post/PostHeader';
import PostPhoto from '@/components/Post/PostPhoto';
import CommentField from '@/components/CommentField';

const Post = (post: _Post) => {
    const [caption, setCaption] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleCreateComment = () => {
        // dispatch acction create Comment
    };

    return (
        <div className={clsx('rounded-lg border-1 border-line', 'bg-white')}>
            <PostHeader {...post} />
            <PostPhoto {...post} />
            <PostBody {...post} />
            {/* <CommentField
                // loading={createCommentLoading}
                onSubmit={handleCreateComment}
                caption={caption}
                onSetCaption={setCaption}
            /> */}
        </div>
    );
};

export default memo(Post);
