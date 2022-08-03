import { forwardRef, ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = forwardRef<any, ContainerProps>(({ className, children }, forwardRef) => {
    return (
        <main ref={forwardRef} className={`mx-auto mt-header-h lg:w-container-w ${className}`}>
            {children}
        </main>
    );
});

Container.displayName = 'Container';

export default Container;
