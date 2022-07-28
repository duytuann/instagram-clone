import { ReactNode } from 'react';
import clsx from 'clsx';

import { ModalType, useModalContext } from '@/contexts/ModalContext';
import IconClose from '@/components/Icon/IconClose';

interface ModalProps {
    children: ReactNode;
    modalType: ModalType;
    lightOverlay?: boolean;
    hideCloseButton?: boolean;
    canClose?: boolean;
    className?: string;
    closeHandler?: () => void;
}

const ModalWrapper = ({
    className,
    modalType,
    hideCloseButton = false,
    lightOverlay = false,
    canClose = true,
    children,
    closeHandler,
}: ModalProps) => {
    const { hideModal } = useModalContext();

    const closeModal = () => {
        if (closeHandler) closeHandler();

        if (canClose) hideModal(modalType);
    };

    return (
        <div className={clsx('fixed inset-0 z-50', 'flex m-auto')}>
            <div
                onClick={closeModal}
                className={clsx('absolute inset-0', lightOverlay ? 'bg-modal-light' : 'bg-modal')}
            />
            {!hideCloseButton && (
                <IconClose
                    onClick={closeModal}
                    className={clsx('absolute top-3 right-3', 'p-1 lg:p-0', 'cursor-pointer')}
                />
            )}
            <div
                className={clsx(
                    'relative',
                    'm-auto max-w-modal-w max-h-modal-h rounded-xl overflow-y-auto scrollbar-none',
                    'animate-zoomIn',
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
