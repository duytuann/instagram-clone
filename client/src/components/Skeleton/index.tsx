import { forwardRef, ImgHTMLAttributes, memo, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface SkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
    rounded?: boolean;
    online?: boolean;
    objectFit?: 'contain' | 'cover';
    profile?: boolean;
    placeholderError?: ReactNode | string;
    isAvatar?: boolean;
}

const isImageLoaded = (src: string) => {
    return new Promise<boolean>((resolve) => {
        const img = document.createElement('img');

        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
        img.src = src;
    });
};

const Skeleton = forwardRef<any, SkeletonProps>(
    ({ alt, src, rounded, className, objectFit, online, placeholderError, profile, isAvatar, ...rest }, forwardRef) => {
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [isError, setIsError] = useState<boolean>(false);

        const imageRef = useRef<HTMLImageElement>(null);

        useEffect(() => {
            const image = imageRef.current;

            if (image == null || src == null) return;

            if (image.complete) setIsLoaded(true);

            isImageLoaded(src).then((isSuccess) => {
                if (!isSuccess) setIsError(true);
            });
        }, [src]);

        let body = null;

        if (isError && typeof placeholderError === 'function') {
            const ErrorComponent: any = placeholderError;

            body = <ErrorComponent />;
        } else {
            body = (
                <>
                    <img
                        {...rest}
                        ref={imageRef}
                        src={src}
                        alt={alt}
                        className={
                            isAvatar
                                ? clsx(
                                      rounded && 'rounded-full',
                                      'h-36	w-36',
                                      objectFit && [
                                          'h-full',
                                          objectFit === 'cover' ? 'object-cover' : 'object-contain',
                                      ],
                                  )
                                : clsx(
                                      'block m-auto overflow-hidden',
                                      isLoaded ? 'opacity-100 visible' : 'opacity-0 invisible',
                                      rounded && 'rounded-full',
                                      objectFit && [
                                          'h-full',
                                          objectFit === 'cover' ? 'object-cover' : 'object-contain',
                                      ],
                                  )
                        }
                        onLoad={() => setIsLoaded(true)}
                        draggable={false}
                    />
                    {!isLoaded && !isError && (
                        <div
                            className={clsx(
                                'absolute inset-0',
                                'bg-[length:200%] bg-skeleton',
                                'animate-skeleton',
                                rounded && 'rounded-full',
                            )}
                        />
                    )}
                    {online && (
                        <div
                            className={clsx(
                                'absolute',
                                'border-3 border-white rounded-full',
                                'bg-base-green',
                                profile ? ['bottom-0 right-5', 'w-6 h-6'] : ['-bottom-0.5 -right-0.5', 'w-4 h-4'],
                            )}
                        />
                    )}
                </>
            );
        }

        return (
            <div
                ref={forwardRef}
                className={clsx('relative', 'flex-shrink-0', className, objectFit === 'cover' && 'w-full h-full')}
            >
                {body}
            </div>
        );
    },
);

Skeleton.displayName = 'Skeleton';

export default memo(Skeleton);
