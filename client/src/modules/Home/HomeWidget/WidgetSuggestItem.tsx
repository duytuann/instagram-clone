import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import {} from '@/hooks';
import { SpinnerRing } from '@/components/Spinner';
import Skeleton from '@/components/Skeleton';
import { avatar } from '@/assets/images';

const WidgetSuggestItem = () => {
    const navigate = useNavigate();
    // const { isFollowed, followUserLoading, handleFollowActions } = useFollowUser(user);
    // const { visitProfile } = useUser();

    const onVisitProfile = (username: string) => {
        navigate('adfafds');
    };

    return (
        <div className="flex items-center text-sm-1">
            <Skeleton
                onClick={() => onVisitProfile('haha')}
                className="w-8 h-8 rounded-full mr-3"
                src={avatar}
                rounded
                alt="Avatar"
                objectFit="cover"
            />
            <div className="min-w-0">
                <div
                    onClick={() => onVisitProfile('haha')}
                    className={clsx('font-medium truncate', 'cursor-pointer', 'hover:underline')}
                >
                    {'username'}
                </div>
                <div className={clsx('mt-1 truncate', 'text-base-gray')}>{'user.followers.length'} followers</div>
            </div>
            {/* {followUserLoading ? (
                <SpinnerRing className="ml-auto" />
            ) : (
                <button
                    onClick={() => handleFollowActions()}
                    className={clsx('btn ml-auto', isFollowed ? 'text-base-black' : 'text-primary')}
                >
                    {isFollowed ? 'Following' : 'Follow'}
                </button>
            )} */}
        </div>
    );
};

export default WidgetSuggestItem;
