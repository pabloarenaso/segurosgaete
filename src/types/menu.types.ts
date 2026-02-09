export interface MenuItem {
    label: string; // The visible text
    href: string;  // The URL
    type: 'category' | 'landing' | 'link';
    items?: MenuItem[]; // Sub-items (mainly for categories)
    isOpen?: boolean; // UI state for tree expansion
}
