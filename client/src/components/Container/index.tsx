import { forwardRef, ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = forwardRef<any, ContainerProps>(({ className, children }, forwardRef) => {
    return (
        <div ref={forwardRef} className={`mx-auto lg:w-container-w justify-center ${className}`}>
            {children}
        </div>
    );
});

Container.displayName = 'Container';

export default Container;
