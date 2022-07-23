import React from 'react';

interface IAuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
    return <>{children}</>;
};

export default AuthLayout;
