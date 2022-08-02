import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { useClickOutside, useAppSelector, useAppDispatch } from '@/hooks';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import { routes } from '@/routes/routes';
import { avatar } from '@/assets/images';
import IconCompass from '@/components/Icon/IconCompass';
import IconCreate from '@/components/Icon/IconCreate';
import IconHeart from '@/components/Icon/IconHeart';
import IconHome from '@/components/Icon/IconHome';
import IconMessenger from '@/components/Icon/IconMessenger';
import Skeleton from '@/components/Skeleton';
import HeaderRightMenu from '@/layouts/components/HeaderRightMenu';
import ModalPostCreator from '@/components/Modal/ModalPostCreator';

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        data: { showModalPostCreator },
    } = useAppSelector((state) => state.global);

    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

    let navigate = useNavigate();

    const menuRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    useClickOutside([menuRef, avatarRef], () => setIsShowMenu(false));

    return (
        <div className="flex items-center justify-end gap-x-5">
            <IconHome onClick={() => navigate(routes.home)} />
            <IconMessenger />
            <IconCreate
                className={clsx('flex-shrink-0', 'cursor-pointer')}
                onClick={() => {
                    dispatch(setShowModalPostCreator(true));
                }}
            />
            <IconCompass />
            <IconHeart />
            <div className={clsx('relative', 'flex-shrink-0', 'cursor-pointer')}>
                <Skeleton
                    ref={avatarRef}
                    objectFit="cover"
                    onClick={() => setIsShowMenu(!isShowMenu)}
                    rounded
                    className="w-7 h-7"
                    src={avatar}
                />
                {isShowMenu && <HeaderRightMenu ref={menuRef} />}
            </div>
            {showModalPostCreator ? <ModalPostCreator /> : null}
        </div>
    );
};

export default Menu;
