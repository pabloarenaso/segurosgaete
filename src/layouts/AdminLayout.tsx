import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    LogOut,
    Image as ImageIcon,
    FileText
} from 'lucide-react';

import logo from '@/assets/logo-horizontal-color.png';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white border-b px-6 h-16 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link to="/admin/landings" className="flex-shrink-0">
                        <img src={logo} alt="Seguros Gaete" className="h-10 w-auto" />
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-4">
                            <li>
                                <Link
                                    to="/admin/landings"
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
                                >
                                    <LayoutDashboard size={18} />
                                    <span>Landing Pages</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/images"
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
                                >
                                    <ImageIcon size={18} />
                                    <span>Imágenes</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/recursos"
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
                                >
                                    <FileText size={18} />
                                    <span>Recursos</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/">Volver al Sitio</Link>
                    </Button>
                    <span className="text-sm font-medium text-gray-500">Admin</span>
                    <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar Sesión">
                        <LogOut size={18} />
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
