import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HowYouCanHelp from "./pages/HowYouCanHelp";
import TrustedTools from "./pages/TrustedTools";
import VerifyInformation from "./pages/VerifyInformation";
import IdentifyFakeNews from "./pages/IdentifyFakeNews";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-you-can-help" element={<HowYouCanHelp />} />
          <Route path="/trusted-tools" element={<TrustedTools />} />
          <Route path="/verify-information" element={<VerifyInformation />} />
          <Route path="/identify-fake-news" element={<IdentifyFakeNews />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
