import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Violations from "./pages/Violations";
import MapView from "./pages/MapView";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { DriverLayout } from "./components/driver/DriverLayout";
import DriverMapView from "./pages/driver/DriverMapView";
import DriverViolations from "./pages/driver/DriverViolations";
import DriverProfile from "./pages/driver/DriverProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/violations" element={<Violations />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Driver App Routes */}
          <Route path="/driver" element={<DriverLayout />}>
            <Route index element={<DriverMapView />} />
            <Route path="violations" element={<DriverViolations />} />
            <Route path="profile" element={<DriverProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
