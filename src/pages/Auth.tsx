import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { AliasDialog } from "@/components/AliasDialog";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAliasDialog, setShowAliasDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const checkProfileAndRedirect = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("alias")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile || !profile.alias) {
      setCurrentUserId(userId);
      setShowAliasDialog(true);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkProfileAndRedirect(session.user.id);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkProfileAndRedirect(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5">
      {/* Navigation */}
      <Navbar showHomeButton />

      <div className="flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md shadow-elevated animate-fade-in">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to SnitchOn</CardTitle>
            <CardDescription className="text-base">
              Report and search for fake news. Help keep information accurate and trustworthy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {loading ? "Connecting..." : "Continue with Google"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        {currentUserId && (
          <AliasDialog
            open={showAliasDialog}
            onOpenChange={setShowAliasDialog}
            userId={currentUserId}
            onSuccess={() => navigate("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
