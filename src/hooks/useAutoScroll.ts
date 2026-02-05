import { useEffect, RefObject } from 'react';

export const useAutoScroll = (containerRef: RefObject<HTMLDivElement>, interval = 10000) => {

    const scrollNext = () => {
        const container = containerRef.current;
        if (!container) return;

        const cardWidth = container.firstElementChild?.clientWidth || 0;
        const scrollAmount = cardWidth + 10; // Match the auto-scroll amount
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        const container = containerRef.current;
        if (!container) return;

        const cardWidth = container.firstElementChild?.clientWidth || 0;
        const scrollAmount = cardWidth + 10;

        if (container.scrollLeft <= 10) {
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const autoScroll = () => {
            // Only scroll if content overflows (mobile/tablet behavior)
            if (container.scrollWidth <= container.clientWidth) return;

            const cardWidth = container.firstElementChild?.clientWidth || 0;
            // Estimate gap (usually 1.5rem = 24px or 2rem = 32px), safer to scroll card + small buffer
            // and let scroll-snap handle the exact alignment.
            const scrollAmount = cardWidth + 10;

            const maxScroll = container.scrollWidth - container.clientWidth;

            // If we are close to the end, reset to start
            if (container.scrollLeft >= maxScroll - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const timer = setInterval(autoScroll, interval);
        return () => clearInterval(timer);
    }, [containerRef, interval]);

    return { scrollNext, scrollPrev };
};
