import React from 'react';

import Header from '@/layouts/components/Header';

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
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
