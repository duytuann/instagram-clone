import { useRef } from 'react';

import clsx from 'clsx';

// types
import { UserWithPostCount } from '~/redux/types/auth';
import { useAddAvatarMutation, useUpdateAvatarMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { authActions } from '~/redux/slices/authSlice';
import { postActions } from '~/redux/slices/postSlice';
import { commentActions } from '~/redux/slices/commentSlice';
import { useUser } from '~/hooks';

import { SpinnerLogo } from '~/components/Spinner';
import Skeleton from '~/components/Skeleton';
import DetailActions from './DetailActions';

import avatar from '~/assets/avatar.png';

interface ProfileDetailProps {
    user: UserWithPostCount;
}

const ProfileDetail = ({ user }: ProfileDetailProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { currentUser, checkOnline } = useUser();
    const [addAvatar, { loading: addAvatarLoading }] = useAddAvatarMutation();
    const [updateAvatar, { loading: updateAvatarLoading }] = useUpdateAvatarMutation();
    const dispatch = useStoreDispatch();

    const isMe = currentUser._id === user._id;
    const isLoading = addAvatarLoading || updateAvatarLoading;

    const handleAvatar = (file?: File) => {
        if (file == null || !isMe) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            let avatar: string | null = null;

            // Add avatar
            if (currentUser.avatar == null) {
                const response = await addAvatar({
                    variables: {
                        base64Photo: reader.result as string,
                    },
                });

                const data = response.data?.addAvatar;

                if (data?.success) avatar = data.avatar as string;
            } else {
                const response = await updateAvatar({
                    variables: {
                        oldPhotoUrl: currentUser.avatar as string,
                        base64Photo: reader.result as string,
                    },
                });

                const data = response.data?.updateAvatar;

                if (data?.success) avatar = data.avatar as string;
            }

            if (avatar == null) return;

            dispatch(authActions.setAvatar({ avatar }));
            dispatch(postActions.updateAvatar({ currentUserId: currentUser._id, avatar }));
            dispatch(commentActions.updateAvatar({ currentUserId: currentUser._id, avatar }));
        };
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
                        rounded
                        profile
                        online={checkOnline(user._id)}
                        onClick={() => {
                            if (isMe) fileInputRef.current?.click();
                        }}
                        objectFit="cover"
                        src={user.avatar ?? avatar.src}
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
                    <h1 className="text-4xl">{user.username}</h1>
                    <DetailActions user={user} />
                </div>

                <div className="flex gap-x-5 justify-center md:justify-start text-base mt-5">
                    <span>
                        <span className="font-medium">{user.postCounts}</span> posts
                    </span>
                    <span>
                        <span className="font-medium">{user.followers.length}</span> followers
                    </span>
                    <span>
                        <span className="font-medium">{user.following.length}</span> following
                    </span>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
