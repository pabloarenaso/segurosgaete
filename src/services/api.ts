import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    withCredentials: true
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken'); // Or use a secure cookie approach if preferred
    // For this MV, we follow the user's "admin-secret-token" approach, but we might store it in LS
    // The user prompt said "Guardar sesión en localStorage"
    // If the user logs in, we might save the token. 
    // Since the user suggested `req.headers.authorization === 'admin-secret-token'`, we will stick to that or logic to retrieve it.

    // Actually, the simple auth check in server checks for a hardcoded token or env var. 
    // If the user logs in successfully, we should probably set this header.
    // For now, let's assume valid login sets 'adminToken' in localStorage.

    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export const landingService = {
    getAll: async () => {
        const response = await api.get('/landings');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/landings/${id}`);
        return response.data;
    },
    create: async (data: { name: string; slug: string; menuCategory: string }) => {
        const response = await api.post('/landings', data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await api.put(`/landings/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/landings/${id}`);
        return response.data;
    },
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'image');
        const response = await api.post('/upload', formData);
        return response.data;
    },
    uploadResource: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'resource');
        const response = await api.post('/upload', formData);
        return response.data;
    },
    getAllResources: async () => {
        const response = await api.get('/resources');
        return response.data;
    },
    saveResource: async (resource: any) => {
        const response = await api.post('/resources', resource);
        return response.data;
    },
    getAllImages: async () => {
        const response = await api.get('/images');
        return response.data;
    },
    getMenu: async () => {
        try {
            const response = await api.get('/menu');
            return response.data;
        } catch (error) {
            console.warn("API Menu fetch failed, trying static fallback...", error);
            try {
                // Fallback to static JSON file in public folder
                // This works for static deployments where 'data/menu-config.json' exists
                const fallbackResponse = await axios.get('/data/menu-config.json');
                return fallbackResponse.data;
            } catch (fallbackError) {
                console.error("Static menu fetch also failed", fallbackError);
                return { items: [] };
            }
        }
    }
};

export default api;
