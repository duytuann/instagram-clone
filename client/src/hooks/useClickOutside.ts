import { RefObject } from 'react';

import useEventListener from './useEventListener';

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
    element: RefObject<T> | Array<RefObject<T>>,
    handler: (e: MouseEvent) => void,
): void => {
    const listener = (e: MouseEvent) => {
        const checkClickOutside = (el: RefObject<T>) => el.current != null && !el.current.contains(e.target as Node);

        const isClickOutside = Array.isArray(element) ? element.every(checkClickOutside) : checkClickOutside(element);

        if (isClickOutside) handler(e);
    };

    useEventListener('mousedown', listener);
    useEventListener('touchstart', listener);
};
