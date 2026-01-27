import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { landingService } from '@/services/api';
import DynamicLanding from './pages/DynamicLanding'; // Adjust path
import NotFound from './pages/NotFound';
import { Loader2 } from 'lucide-react';

const DynamicRouter = () => {
    const location = useLocation();

    // Fetch Index
    const { data: landings = [], isLoading } = useQuery({
        queryKey: ['landings-index'],
        queryFn: landingService.getAll,
        staleTime: 5 * 60 * 1000 // Cache for 5 mins
    });

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    // Find match
    const currentSlug = location.pathname;
    const match = landings.find((l: any) => l.slug === currentSlug || l.slug === currentSlug + '/');

    if (match) {
        return <DynamicLanding landingId={match.id} />;
    }

    return <NotFound />;
};

export default DynamicRouter;
