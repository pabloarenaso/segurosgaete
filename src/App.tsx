import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import SeguroEdificio from "./pages/SeguroEdificio";
import VidaGuardias from "./pages/VidaGuardias";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Editor from "./pages/admin/Editor";
import AdminLayout from "./layouts/AdminLayout";
import EditFloatingButton from "./components/admin/EditFloatingButton";
import DynamicRouter from "./DynamicRouter";
import DynamicLanding from "./pages/DynamicLanding";
import Images from "./pages/admin/Images";
import Resources from "./pages/admin/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <EditFloatingButton />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/seguros/edificio" element={<SeguroEdificio />} /> */}
          {/* <Route path="/seguros/guardias" element={<VidaGuardias />} /> */}

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/landings" replace />} />
            <Route path="landings" element={<Dashboard />} />
            <Route path="editor/:id" element={<Editor />} />
            <Route path="images" element={<Images />} />
            <Route path="recursos" element={<Resources />} />
            {/* Other admin routes will be added here */}
          </Route>

          <Route path="/admin/preview/:id" element={<DynamicLanding />} />

          {/* CATCH-ALL: Dynamic Router handles CMS pages or 404 */}
          <Route path="*" element={<DynamicRouter />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;