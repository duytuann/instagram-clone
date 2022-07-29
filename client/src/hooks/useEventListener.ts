import { RefObject, useEffect, useRef } from 'react';

type CallbackEvent = (e: MouseEvent) => void;

const useEventListener = (
    eventName: keyof WindowEventMap,
    handler: CallbackEvent,
    eventOptions?: AddEventListenerOptions,
): RefObject<HTMLElement> => {
    const savedHandlerRef = useRef<any>(null);
    const targetRef = useRef<HTMLElement>(null);

    useEffect(() => {
        savedHandlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: HTMLElement | Window = targetRef.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        const eventListener = (e: Event) => savedHandlerRef.current(e);

        targetElement.addEventListener(eventName, eventListener, eventOptions);

        return () => targetElement.removeEventListener(eventName, eventListener, eventOptions);
    }, [eventName, eventOptions]);

    return targetRef;
};

export default useEventListener;
