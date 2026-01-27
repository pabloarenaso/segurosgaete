import { create } from 'zustand';
import { Landing } from '@/types/landing.types';

interface EditorStore {
    currentLanding: Landing | null;
    isDirty: boolean;
    isLoading: boolean;
    setLanding: (landing: Landing | null) => void;
    updateLanding: (landing: Partial<Landing>) => void; // Shallow update
    setDirty: (dirty: boolean) => void;
    setLoading: (loading: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
    currentLanding: null,
    isDirty: false,
    isLoading: false,
    setLanding: (landing) => set({ currentLanding: landing, isDirty: false }),
    updateLanding: (updatedFields) =>
        set((state) => ({
            currentLanding: state.currentLanding ? { ...state.currentLanding, ...updatedFields } : null,
            isDirty: true
        })),
    setDirty: (dirty) => set({ isDirty: dirty }),
    setLoading: (loading) => set({ isLoading: loading })
}));
