import { useState } from 'react';
import clsx from 'clsx';

import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import ModalWrapper from '../ModalWrapper';
import { ReduxStateType } from '@/redux/types';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentAction, createPostStart } from '@/redux/slices/postSlice';
// import { authActions } from '@/redux/slices/authSlice';
import { isEmptyInput } from '@/helpers/string';
// import { toast } from '@/store/toast';
import Loading from '@/components/Loading';

const ModalPostCreator = () => {
    const {
        data: { user },
        status,
    } = useAppSelector((state) => state.auth);

    const [caption, setCaption] = useState<string>(''); // selectedPost?.caption ?? ''
    const [preview, setPreview] = useState<string>('');
    const dispatch = useAppDispatch();

    // const oldPhoto = selectedPost?.photo ?? '';

    const reset = () => {
        setCaption('');
        setPreview('');

        // if (!modalTypes.includes(MODAL_TYPES.POST_DETAIL)) dispatch(postActions.setSelectedPost(null));
    };

    const handleCreatePostSubmit = () => {
        dispatch(
            createPostStart({
                UserId: user.userId,
                Caption: caption,
                FileImage: new File([preview], 'image.jpg'),
            }),
        );

        reset();
    };

    const handleUpdatePostSubmit = () => {
        reset();
    };

    return (
        <ModalWrapper
            closeHandler={() => {
                dispatch(setShowModalPostCreator(false));
            }}
        >
            {/* {status === ReduxStateType.LOADING ? (
                <Loading title={currentAction === 'update' ? 'Updating' : 'Sharing'} />
            ) : ( */}
            <div className={clsx('w-[913px] max-w-full mx-auto rounded-xl overflow-hidden', 'bg-white')}>
                <CreatorHeader
                    onCreateOrUpdateSubmit={() => {
                        handleCreatePostSubmit();
                    }}
                />
                <div className={clsx('flex flex-col lg:flex-row h-full')}>
                    <CreatorPhoto preview={preview || 'oldPhoto'} oldPhoto={'oldPhoto'} onSetPreview={setPreview} />
                    <CreatorForm caption={caption} onChangeCaption={setCaption} />
                </div>
            </div>
            {/* )} */}
        </ModalWrapper>
    );
};

export default ModalPostCreator;
