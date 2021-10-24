import { useEffect, useState } from 'react';

export function Responsive({ maxWidth, minWidth, children }) {
    const [,forceUpdate] = useState();

    useEffect(() => {
        window.addEventListener('resize', forceUpdate);
        return () => window.removeEventListener('resize', forceUpdate);
    }, []);

    const width = window.innerWidth;
    if (width <= maxWidth || width >= minWidth)
        return children;
    return null;
}