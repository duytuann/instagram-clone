import React from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes/routes';
import IconCompass from '@/components/Icon/IconCompass';
import IconCreate from '@/components/Icon/IconCreate';
import IconHeart from '@/components/Icon/IconHeart';
import IconHome from '@/components/Icon/IconHome';
import IconMessenger from '@/components/Icon/IconMessenger';

import { MenuContainer } from './styles';

const Menu: React.FC = () => {
    let navigate = useNavigate();

    return (
        <MenuContainer>
            <IconHome onClick={() => navigate(routes.home)} />
            <IconMessenger />
            <IconCreate />
            <IconCompass />
            <IconHeart />
        </MenuContainer>
    );
};

export default Menu;
