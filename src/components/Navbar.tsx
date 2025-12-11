import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Users, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
        <Button
          size="lg"
          className="h-12 px-6"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
