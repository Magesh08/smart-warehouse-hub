import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import WarehouseMap from "./pages/WarehouseMap";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Robots from "./pages/Robots";
import ControlPanel from "./pages/ControlPanel";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/SettingsPage";
import CameraVision from "./pages/CameraVision";
import RobotHealth from "./pages/RobotHealth";
import Environment from "./pages/Environment";
import ActivityTimeline from "./pages/ActivityTimeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/warehouse" element={<WarehouseMap />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/robots" element={<Robots />} />
            <Route path="/control" element={<ControlPanel />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/camera" element={<CameraVision />} />
            <Route path="/robot-health" element={<RobotHealth />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/activity" element={<ActivityTimeline />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
