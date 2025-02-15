import { useRef, useMemo } from "react";

export default function useDebounceFunction<
    T extends (...args: Parameters<T>) => ReturnType<T>
>(call: T, intervalMs: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const timeoutRef = useRef<any>(undefined);

    const func = useMemo(() => {
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                call(...args);
            }, intervalMs);
        };
    }, [call, intervalMs]);

    return func;
}
