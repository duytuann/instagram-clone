import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import Header from '@/layouts/components/Header';
import { useAppDispatch, useAppSelector } from '@/hooks';

interface IMainLayoutProps {
    children: any;
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
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default MainLayout;
