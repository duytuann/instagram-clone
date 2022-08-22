import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import Skeleton from '@/components/Skeleton';
import { avatar } from '@/assets/images';

const WidgetHeader = () => {
    const {
        data: { user },
    } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const onVisitProfile = (username?: string) => {
        navigate(`/${username}`);
    };

    return (
        <div className="flex items-center text-sm-1">
            <Skeleton
                objectFit="cover"
                onClick={() => onVisitProfile(user.username)}
                rounded
                className={clsx('w-14 h-14 rounded-full mr-3', 'cursor-pointer')}
                src={user.avatar ?? avatar}
                alt="Avatar"
            />
            <div>
                <div onClick={() => onVisitProfile('hhaa')} className={clsx('font-medium', 'cursor-pointer')}>
                    {user.username}
                </div>
                <div className={clsx('mt-0.5', 'text-base-gray')}>{user.name}</div>
            </div>
            <button className={clsx('btn ml-auto', 'text-primary')}>Switch</button>
        </div>
    );
};

export default WidgetHeader;
