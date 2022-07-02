import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logo } from '@/assets/images';
import Menu from '@/layouts/components/Menu';
import Search from '@/layouts/components/Search';

import { HeaderContainer, Container, Logo } from './styles';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <Container>
                <Logo
                    onClick={() => {
                        navigate('/');
                    }}
                    src={logo}
                    alt="Instagram"
                />
                <Search />
                <Menu />
            </Container>
        </HeaderContainer>
    );
};

export default Header;
