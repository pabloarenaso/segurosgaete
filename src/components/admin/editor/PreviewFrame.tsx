import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PreviewFrameProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    children: React.ReactNode;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ children, ...props }) => {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const frame = frameRef.current;
        if (frame && frame.contentDocument) {
            const doc = frame.contentDocument;

            // Function to copy styles
            const copyStyle = (node: Node) => {
                if (node instanceof Element && (node.tagName === 'STYLE' || (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet'))) {
                    doc.head.appendChild(node.cloneNode(true));
                }
            };

            // Copy existing styles
            Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).forEach(style => {
                doc.head.appendChild(style.cloneNode(true));
            });

            // Observe for new styles injected into the main document
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        copyStyle(node);
                    });
                });
            });

            observer.observe(document.head, { childList: true });

            // Copy classes from main html/body to iframe (crucial for Tailwind variables like --foreground)
            doc.documentElement.className = document.documentElement.className;
            doc.body.className = document.body.className;

            // Set base styles
            doc.body.style.margin = '0';
            doc.body.style.backgroundColor = '#ffffff';
            doc.body.style.color = '#0f172a'; // Force slate-900 as default text color
            doc.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';

            // Force ScrollReveal items to be visible in preview
            const previewStyle = doc.createElement('style');
            previewStyle.textContent = `
                .scroll-reveal-item {
                    opacity: 1 !important;
                    transform: none !important;
                    transition: none !important;
                }
            `;
            doc.head.appendChild(previewStyle);

            setMountNode(doc.body);

            return () => observer.disconnect();
        }
    }, []);

    return (
        <iframe
            ref={frameRef}
            {...props}
            style={{ border: 'none', width: '100%', height: '100%', ...props.style }}
        >
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    );
};

export default PreviewFrame;
