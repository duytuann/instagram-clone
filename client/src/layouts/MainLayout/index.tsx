import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';

import Header from '@/layouts/components/Header';
import ModalPostCreator from '@/components/Modal/ModalPostCreator';

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        data: { isAuthenticated },
    } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated]);
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
