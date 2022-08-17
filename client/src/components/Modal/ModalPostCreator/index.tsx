import { useState } from 'react';
import clsx from 'clsx';

import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import ModalWrapper from '../ModalWrapper';
import { ReduxStateType } from '@/redux/types';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createPostStart } from '@/redux/slices/postSlice';
import Loading from '@/components/Loading';

const ModalPostCreator = () => {
    const {
        data: { user },
    } = useAppSelector((state) => state.auth);

    const { status } = useAppSelector((state) => state.post);

    const [caption, setCaption] = useState<string>(''); // selectedPost?.caption ?? ''
    const [preview, setPreview] = useState<string>('');
    const [file, setFile] = useState<any>();
    const dispatch = useAppDispatch();

    const reset = () => {
        setCaption('');
        setPreview('');
        setFile(undefined);

        // if (!modalTypes.includes(MODAL_TYPES.POST_DETAIL)) dispatch(postActions.setSelectedPost(null));
    };

    const handleCreatePostSubmit = () => {
        const formData = new FormData();
        formData.append('Caption', caption);
        formData.append('file', file, file?.name);

        dispatch(createPostStart(formData));

        reset();

        dispatch(setShowModalPostCreator(false));
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
            <div className={clsx('w-[913px] max-w-full mx-auto rounded-xl overflow-hidden', 'bg-white')}>
                <CreatorHeader
                    onCreateOrUpdateSubmit={() => {
                        handleCreatePostSubmit();
                    }}
                />
                <div className={clsx('flex flex-col lg:flex-row h-full')}>
                    <CreatorPhoto
                        preview={preview}
                        // oldPhoto={'oldPhoto'}
                        onSetPreview={setPreview}
                        onSetFile={setFile}
                    />
                    <CreatorForm caption={caption} onChangeCaption={setCaption} />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ModalPostCreator;
