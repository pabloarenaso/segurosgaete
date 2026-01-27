import { Edit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EditFloatingButton = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const location = useLocation();

    // Don't show on admin routes or home page or static insurance pages
    if (!isAuthenticated || location.pathname.startsWith('/admin') || location.pathname === '/' || location.pathname.startsWith('/seguros/edificio') || location.pathname.startsWith('/seguros/guardias')) {
        return null;
    }

    // Identify if we are on a landing page that can be edited.
    // Ideally, we'd know the ID. For now, we link to the dashboard or try to interpret the URL.
    // A better approach: The landing page component itself sets the "Edit ID" in a context/store.
    // For now, let's just link to the dashboard "Edit Mode" or check if we can parse the landing.

    // Simplification for Part 1: Just link to /admin/landings
    return (
        <div className="fixed top-24 right-4 z-50 animate-in fade-in slide-in-from-right-4">
            <Link to="/admin/landings">
                <Button className="shadow-lg gap-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-6">
                    <Edit size={16} />
                    Editar Landing
                </Button>
            </Link>
        </div>
    );
};

export default EditFloatingButton;
