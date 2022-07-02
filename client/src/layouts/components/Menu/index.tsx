import React from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes/routes';

import { avatar } from '@/assets/images';
import IconCompass from '@/components/Icon/IconCompass';
import IconCreate from '@/components/Icon/IconCreate';
import IconHeart from '@/components/Icon/IconHeart';
import IconHome from '@/components/Icon/IconHome';
import IconMessenger from '@/components/Icon/IconMessenger';

import { MenuContainer, User } from './styles';

const Menu: React.FC = () => {
    let navigate = useNavigate();

    return (
        <MenuContainer>
            <IconHome onClick={() => navigate(routes.home)} />
            <IconMessenger />
            <IconCreate />
            <IconCompass />
            <IconHeart />
            <User src={avatar} />
        </MenuContainer>
    );
};

export default Menu;
