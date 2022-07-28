import { DragEvent, ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';

interface DropZoneProps {
    className?: string;
    children?: ReactNode;
    onDrop: (file: File) => void;
}

const DropZone = ({ children, className, onDrop }: DropZoneProps) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const savedTargetRef = useRef<EventTarget | null>(null);

    const handleDrop = (e: DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        onDrop(e.dataTransfer.files[0]);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();

                savedTargetRef.current = e.target;

                setIsDragging(true);
            }}
            onDragLeave={(e) => {
                if (savedTargetRef.current !== e.target) return;

                e.stopPropagation();
                e.preventDefault();

                setIsDragging(false);
            }}
            className={clsx('relative', 'flex-center flex-col h-full', className)}
        >
            <div
                className={clsx(
                    'absolute inset-0 z-10',
                    isDragging && [
                        'border-dashed border-3 border-primary lg:rounded-bl-xl',
                        'bg-primary bg-opacity-10',
                    ],
                    'select-none pointer-events-none',
                )}
            />
            {children}
        </div>
    );
};

export default DropZone;
