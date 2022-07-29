import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { isImageFormat } from '@/helpers/string';
import IconPhotoVideo from '@/components/Icon/IconPhotoVideo';
import DropZone from '@/components/DropZone';
import Skeleton from '@/components/Skeleton';

interface CreatorPhotoProps {
    preview: string;
    oldPhoto: string;
    onSetPreview: (preview: string) => void;
}

const CreatorPhoto = ({ preview, oldPhoto, onSetPreview }: CreatorPhotoProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSetFile = (file?: File) => {
        if (file == null) return;

        if (!isImageFormat(file)) {
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => onSetPreview(reader.result as string);
    };

    useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

    const setPhoto = () => fileInputRef.current?.click();

    return (
        <div className="lg:w-3/5 h-[580px]">
            <DropZone onDrop={handleSetFile}>
                {preview || oldPhoto ? (
                    <div className="w-full h-full">
                        <Skeleton
                            onClick={setPhoto}
                            objectFit="cover"
                            src={preview || oldPhoto}
                            alt="Upload"
                            className="cursor-pointer"
                        />
                    </div>
                ) : (
                    <>
                        <IconPhotoVideo />
                        <h2 className={clsx('mt-3 text-xl', 'select-none')}>Drag photos and videos here</h2>
                        <button
                            onClick={setPhoto}
                            className={clsx('btn mt-4 text-sm px-3 py-2', 'text-white bg-primary')}
                        >
                            Select from computer
                        </button>
                    </>
                )}
            </DropZone>
            <input
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/gif"
                onChange={(e) => handleSetFile(e.target.files?.[0])}
                className="hidden"
                type="file"
            />
        </div>
    );
};

export default CreatorPhoto;
