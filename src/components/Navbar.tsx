import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Users, AlertTriangle, CheckCircle, ExternalLink, Home } from "lucide-react";

interface NavbarProps {
  showHomeButton?: boolean;
}

const Navbar = ({ showHomeButton = false }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Home Button - shown on all pages except homepage */}
        {(showHomeButton || !isHomePage) && (
          <Button
            size="lg"
            className="h-12 px-6"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 flex-1">
          <Button
            variant="ghost"
            onClick={() => navigate("/about-us")}
            className="flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            About Us
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/how-you-can-help")}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            How You Can Help
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/identify-fake-news")}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Identify Fake News
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/verify-information")}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Verify Information
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/trusted-tools")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Trusted Tools
          </Button>
        </div>

        {/* Get Started button only on homepage */}
        {isHomePage && (
          <Button
            size="lg"
            className="h-12 px-6"
            onClick={() => navigate("/auth")}
          >
            Start Reporting
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
