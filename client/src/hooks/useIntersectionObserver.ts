import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverReturn {
    observerRef: MutableRefObject<HTMLDivElement | null>;
    containerObserverRef: MutableRefObject<HTMLDivElement | null>;
    isIntersecting: boolean;
}

// TODO: Disconnect when no more
export const useIntersectionObserver = (options?: IntersectionObserverInit): UseIntersectionObserverReturn => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    const observerRef = useRef<HTMLDivElement | null>(null);
    const containerObserverRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = observerRef.current;

        if (node == null) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { ...options, root: containerObserverRef.current },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [options]);

    return { observerRef, containerObserverRef, isIntersecting };
};
