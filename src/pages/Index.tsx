import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, Search, Users, AlertTriangle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-elevated animate-fade-in">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <div className="space-y-4 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            SnitchOn
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Report and search for fake news. Help keep information accurate and trustworthy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            className="h-14 px-8 text-lg"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl">
              <AlertTriangle className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Report Fake News</h3>
            <p className="text-muted-foreground">
              Contribute to the database by reporting misinformation with detailed evidence and sources
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl">
              <Search className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Search & Verify</h3>
            <p className="text-muted-foreground">
              Quickly search through reported fake news to verify claims and find the truth
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Community Driven</h3>
            <p className="text-muted-foreground">
              Join a community committed to fighting misinformation and promoting accurate information
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t">
        <p>© 2024 SnitchOn. Fighting fake news, one report at a time.</p>
      </footer>
    </div>
  );
};

export default Index;