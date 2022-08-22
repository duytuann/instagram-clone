import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import WidgetSuggestItem from './WidgetSuggestItem';
import { routes } from '@/routes/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import IconNotFound from '@/components/Icon/IconNotFound';

const WidgetSuggest = () => {
    const navigate = useNavigate();

    let body = null;
    let suggestedUsers: any = [];
    if (suggestedUsers.length === 0)
        // && !getSuggestionsLoading
        body = (
            <div className={clsx('text-center mt-5', 'text-base-gray')}>
                <IconNotFound className="w-2/5 mx-auto" />
                <h1 className={clsx('mt-5 mb-2 text-sm font-bold')}>We didn&apos;t find any users to follow</h1>
                <p>Let&apos;s invite more friends to join</p>
            </div>
        );
    else
        body = (
            <div className="space-y-4 mt-3">
                {suggestedUsers.map((user: any) => (
                    <WidgetSuggestItem key={user._id} /> // props user
                ))}
            </div>
        );

    return (
        <div className="text-sm-1 mt-7">
            <div className="flex-between">
                <span className={clsx('font-medium', 'text-base-gray')}>Suggestions For You</span>
                {suggestedUsers.length > 0 && (
                    <button onClick={() => navigate('route.people')} className="btn">
                        See All
                    </button>
                )}
            </div>
            {body}
        </div>
    );
};

export default WidgetSuggest;
