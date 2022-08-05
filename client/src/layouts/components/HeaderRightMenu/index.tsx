import { forwardRef } from 'react';
import clsx from 'clsx';
import { faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutStart } from '@/redux/slices/authSlice';

const HeaderRightMenu = forwardRef<any, any>((_props, forwardRef) => {
    const dispatch = useAppDispatch();

    const {
        data: { userToken },
    } = useAppSelector((state) => state.auth);

    return (
        <ul
            ref={forwardRef}
            className={clsx(
                'absolute top-[calc(100%+10px)] -right-4',
                'rounded-md shadow-[0_1px_5px_1px_rgba(0,0,0,0.0975)] w-52 text-sm',
                'bg-white',
            )}
        >
            <li onClick={() => {}} className={clsx('flex items-center py-3 pl-4', 'select-none', 'hover:bg-gray-50')}>
                <FontAwesomeIcon className="mr-3" icon={faUser} />
                <span>Profile</span>
            </li>
            <li className={clsx('flex items-center py-3 pl-4', 'select-none', 'hover:bg-gray-50')}>
                <FontAwesomeIcon className="mr-3" icon={faBookmark} />
                <span>Saved</span>
            </li>
            <li className={clsx('flex items-center py-3 pl-4', 'select-none', 'hover:bg-gray-50')}>
                <FontAwesomeIcon className="mr-3" icon={faSliders} />
                <span>Settings</span>
            </li>
            <li className={clsx('flex items-center py-3 pl-4', 'select-none', 'hover:bg-gray-50')}>
                <FontAwesomeIcon className="mr-3" icon={faRepeat} />
                <span>Switch Accounts</span>
            </li>
            <li
                onClick={() => dispatch(logoutStart(userToken))}
                className={clsx('flex items-center py-3 pl-4 border-t border-line', 'select-none', 'hover:bg-gray-50')}
            >
                Log Out
            </li>
        </ul>
    );
});

HeaderRightMenu.displayName = 'HeaderRightMenu';

export default HeaderRightMenu;
