export interface Landing {
    id: string;
    name: string;
    slug: string;
    menuCategory: string;
    isFeatured?: boolean; // New field for featured landings
    createdAt: string;
    updatedAt: string;
    content: LandingContent;
}

export interface LandingContent {
    hero: HeroSection;
    form: FormSection;
    coverages: CoveragesSection;
    benefits: BenefitsSection;
    faq: FAQSection;
    resources: ResourcesSection;
}

export interface HeroSection {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export interface FormSection {
    title: string;
    fields: FormField[];
    enableStep2?: boolean;
    emailTo?: string;
    successMessage?: string;
}

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select';
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select types
    step?: number; // New field: 1 or 2
}

export interface CoveragesSection {
    title: string;
    subtitle: string;
    items: CoverageItem[];
}

export interface CoverageItem {
    id: string; // Added for drag & drop
    icon: string;
    title: string;
    description: string;
    recommended?: boolean;
    price?: string;
    features?: string[];
}

export interface BenefitsSection {
    title: string;
    subtitle: string;
    items: BenefitItem[];
}

export interface BenefitItem {
    id: string; // Added for drag & drop
    icon: string;
    title: string;
    description: string;
}

export interface FAQSection {
    title: string;
    video: {
        thumbnail: string;
        iframeUrl: string;
        title: string;
    };
    questions: FAQItem[];
}

export interface FAQItem {
    id: string; // Added for drag & drop
    question: string;
    answer: string;
}

export interface ResourcesSection {
    visible: boolean;
    title: string;
    subtitle: string;
    enabledResourceIds: string[];
}
