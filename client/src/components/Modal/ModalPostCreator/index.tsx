import { useState } from 'react';
import clsx from 'clsx';

import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import ModalWrapper from '../ModalWrapper';
import { MODAL_TYPES, useModalContext } from '@/contexts/ModalContext';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentAction, createPostStart } from '@/redux/slices/postSlice';
// import { authActions } from '@/redux/slices/authSlice';
import { isEmptyInput } from '@/helpers/string';
// import { toast } from '@/store/toast';
import Loading from '@/components/Loading';

const ModalPostCreator = () => {
    const { modalTypes, hideModal } = useModalContext();
    // const { selectedPost, currentAction } = usePostSelector();
    // const { currentUser, selectedUser } = useAuthSelector();

    const [caption, setCaption] = useState<string>(''); // selectedPost?.caption ?? ''
    const [preview, setPreview] = useState<string>('');

    // const [createPost, { loading: loadingCreatePost }] = useCreatePostMutation();
    // const [updatePost, { loading: loadingUpdatePost }] = useUpdatePostMutation();
    const dispatch = useAppDispatch();

    // const oldPhoto = selectedPost?.photo ?? '';

    const reset = () => {
        // setCaption('');
        setPreview('');
        // hideModal([MODAL_TYPES.POST_CREATOR, MODAL_TYPES.POST_ACTIONS]);

        // if (!modalTypes.includes(MODAL_TYPES.POST_DETAIL)) dispatch(postActions.setSelectedPost(null));
    };

    const handleCreatePostSubmit = async () => {};

    const handleUpdatePostSubmit = async () => {
        // const response = await updatePost({
        //     variables: {
        //         updatePostInput: {
        //             postId: selectedPost!._id,
        //             caption,
        //             ...(preview
        //                 ? {
        //                       newBase64Photo: preview,
        //                       oldPhotoUrl: oldPhoto,
        //                   }
        //                 : {}),
        //         },
        //     },
        // });
        // const data = response.data?.updatePost;
        // if (!data?.success) return;
        // dispatch(postActions.updatePost(data.post!));
        // reset();
        // toast({ messageType: 'updatePostSuccess', status: 'success' });
    };

    return (
        <ModalWrapper modalType={MODAL_TYPES.POST_CREATOR}>
            {/* {loadingCreatePost || loadingUpdatePost ? (
                <Loading title={currentAction === 'update' ? 'Updating' : 'Sharing'} />
            ) : ( */}
            <div className={clsx('w-[913px] max-w-full mx-auto rounded-xl overflow-hidden', 'bg-white')}>
                <CreatorHeader onCreateOrUpdateSubmit={() => {}} />
                <div className={clsx('flex flex-col lg:flex-row h-full')}>
                    {/* <CreatorPhoto preview={preview || oldPhoto} oldPhoto={oldPhoto} onSetPreview={setPreview} /> */}
                    <CreatorForm caption={caption} onChangeCaption={setCaption} />
                </div>
            </div>
            {/* )} */}
        </ModalWrapper>
    );
};

export default ModalPostCreator;
