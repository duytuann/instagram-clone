import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { useClickOutside } from '@/hooks';
import { routes } from '@/routes/routes';
import { avatar } from '@/assets/images';
import IconCompass from '@/components/Icon/IconCompass';
import { MODAL_TYPES, useModalContext } from '@/contexts/ModalContext';
import IconCreate from '@/components/Icon/IconCreate';
import IconHeart from '@/components/Icon/IconHeart';
import IconHome from '@/components/Icon/IconHome';
import IconMessenger from '@/components/Icon/IconMessenger';
import Skeleton from '@/components/Skeleton';
import HeaderRightMenu from '@/layouts/components/HeaderRightMenu';
import ModalPostCreator from '@/components/Modal/ModalPostCreator';

const Menu: React.FC = () => {
    const [isShowCreatePostModal, setIsShowCreatePostModal] = useState<boolean>(false);

    const { modalTypes, showModal } = useModalContext();

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
                    setIsShowCreatePostModal(!isShowCreatePostModal);
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
            {isShowCreatePostModal ? <ModalPostCreator /> : null}
        </div>
    );
};

export default Menu;
