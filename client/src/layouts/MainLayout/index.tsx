import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';

import Header from '@/layouts/components/Header';

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
            <div>
                <div>{children}</div>
            </div>
        </>
    );
};

export default MainLayout;
