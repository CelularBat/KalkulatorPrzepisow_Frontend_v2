import React from 'react';

export function useInitialTransition(ref, duration = 300, initialStyles = { opacity: 0 }) {
    React.useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const styleKeys = Object.keys(initialStyles);

        // backup obecnych stylów dla podanych kluczy + transition
        const prevStyles = {};
        styleKeys.forEach(key => {
            prevStyles[key] = el.style[key];
        });
        const prevTransition = el.style.transition;

        // ustawienie początkowych stylów
        styleKeys.forEach(key => {
            el.style[key] = initialStyles[key];
        });

        // dynamiczne ustawienie transition dla wszystkich kluczy
        el.style.transition = styleKeys
        .map(key => {
            const cssProp = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            return `${cssProp} ${duration}ms ease`;
        })
        .join(', ');

        // rozpoczęcie animacji w kolejnym ticku
        setTimeout(() => {
            styleKeys.forEach(key => {
                el.style[key] = prevStyles[key];
            });
        },1);

        // zmiana tranzycji po zakończeniu animacji
        const cleanupTimeout = setTimeout(() => {
            el.style.transition = prevTransition;
        }, duration);

        return () => {
            clearTimeout(cleanupTimeout);
            styleKeys.forEach(key => {
                el.style[key] = prevStyles[key];
            });
            el.style.transition = prevTransition;
        };
    }, []);
}
