import { MutableRefObject, useEffect, useRef } from 'react';

interface UseAutoFocusReturn {
    focusRef: MutableRefObject<any>;
}

export const useAutoFocus = (deps?: any[]): UseAutoFocusReturn => {
    const focusRef = useRef<any>(null);

    useEffect(() => {
        const target = focusRef.current;

        if (!target) return;

        target.focus();
        target.setSelectionRange(target.value.length, target.value.length);
    }, [deps]);

    return { focusRef };
};
