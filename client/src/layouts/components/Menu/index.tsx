import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { MenuContainer } from './styles';
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

const Menu: React.FC = () => {
    const { modalTypes, showModal } = useModalContext();

    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

    let navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    return (
        <MenuContainer>
            <IconHome onClick={() => navigate(routes.home)} />
            <IconMessenger />
            <IconCreate
                onClick={() => showModal(MODAL_TYPES.POST_CREATOR)}
                className={clsx('flex-shrink-0', 'cursor-pointer')}
                active={modalTypes.includes(MODAL_TYPES.POST_CREATOR)}
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
        </MenuContainer>
    );
};

export default Menu;
