import { useRef } from 'react';

type UseDoubleTabReturn = readonly [(callback: () => void) => void];

export const useDoubleTab = (delay = 300): UseDoubleTabReturn => {
    const lastTabRef = useRef<number>(0);

    const doubleTab = (callback: () => void) => {
        const now = Date.now();

        if (lastTabRef.current && now - lastTabRef.current < delay) callback();
        else lastTabRef.current = now;
    };

    return [doubleTab] as const;
};
