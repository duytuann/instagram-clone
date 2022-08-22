import { useRef } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@/hooks';
import Actions from '@/components/Actions';
import { updateAvatarStart } from '@/redux/slices/userSlice';
import { SpinnerLogo } from '@/components/Spinner';
import Skeleton from '@/components/Skeleton';
import DetailActions from '@/modules/Profile/components/DetailActions';
import { avatar } from '@/assets/images';

const ProfileDetail = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const {
        data: { currentProfile },
    } = useAppSelector((state) => state.user);

    const {
        data: { user },
    } = useAppSelector((state) => state.auth);
    const isMe = currentProfile.userId === user.userId;
    const isLoading = false;

    const handleAvatar = (file?: File) => {
        if (file == null || !isMe) return;

        const formData = new FormData();
        formData.append('file', file, file?.name);

        dispatch(updateAvatarStart(formData));
    };

    return (
        <>
            <div className="md:col-span-1 col-span-3">
                <div
                    className={clsx(
                        'relative',
                        'w-36 h-36 mt-4 mx-auto md:ml-7',
                        isMe && !isLoading && 'cursor-pointer',
                    )}
                >
                    <Skeleton
                        style={{ height: '150px', width: '150px' }}
                        rounded
                        profile
                        onClick={() => {
                            if (isMe) fileInputRef.current?.click();
                        }}
                        objectFit="cover"
                        src={currentProfile.avatar ?? avatar}
                        alt="Avatar"
                    />
                    {isLoading && (
                        <>
                            <div className={clsx('absolute inset-0', 'rounded-full', 'bg-modal-light')} />
                            <SpinnerLogo className={clsx('absolute inset-0', 'w-2/5 m-auto')} />
                        </>
                    )}
                </div>

                {isMe && (
                    <input
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/gif"
                        onChange={(e) => handleAvatar(e.target.files?.[0])}
                        className="hidden"
                        type="file"
                    />
                )}
            </div>

            <div className="col-span-3 md:col-span-2">
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-x-5 flex-wrap mt-4 md:mt-0">
                    <h1 className="text-4xl">{currentProfile.username}</h1>
                    <DetailActions />
                </div>

                <div className="flex gap-x-5 justify-center md:justify-start text-base mt-5">
                    <span>
                        <span className="font-medium">{currentProfile?.previews?.length}</span> posts
                    </span>
                    <span>
                        <span className="font-medium">{currentProfile?.follower}</span> followers
                    </span>
                    <span>
                        <span className="font-medium">{currentProfile?.following}</span> following
                    </span>
                </div>
                <div className="pt-6">{user.bio}</div>
            </div>
        </>
    );
};

export default ProfileDetail;
