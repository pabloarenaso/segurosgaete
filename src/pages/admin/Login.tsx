import { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import logo from '@/assets/logo-vertical-color.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hardcoded credentials as per requirements
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isAuthenticated', 'true');
            // Store token for API requests (in a real app this comes from server)
            localStorage.setItem('adminToken', 'admin-secret-token');
            toast.success('Sesión iniciada correctamente');
            navigate('/admin/landings');
        } else {
            toast.error('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Logo */}
            <div className="mb-8">
                <img src={logo} alt="Seguros Gaete" className="h-20 w-auto" />
            </div>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Seguros Gaete OMS</h1>
                    <p className="text-center text-gray-500 mb-6">Ingresa tus credenciales para continuar</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese usuario"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese contraseña"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Ingresar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
