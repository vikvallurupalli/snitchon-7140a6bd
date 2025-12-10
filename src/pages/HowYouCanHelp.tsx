import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Flag, Users, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import reportMisinformationImg from "@/assets/report-misinformation.png";
import volunteerCommunityImg from "@/assets/volunteer-community.png";
import spreadAwarenessImg from "@/assets/spread-awareness.png";
import stayConnectedImg from "@/assets/stay-connected.png";

const HowYouCanHelp = () => {
  const navigate = useNavigate();

  const shareOnSocial = (platform: string) => {
    const url = window.location.origin;
    const text = "Help fight misinformation! Join SnitchOn to report and verify fake news.";
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-8"
        >
          ← Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-4 text-foreground">How You Can Help</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Every contribution matters in the fight against misinformation. Here's how you can make a difference.
        </p>

        <div className="space-y-8">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src={reportMisinformationImg} 
                  alt="Report misinformation illustration" 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Report Misinformation
                  </CardTitle>
                  <CardDescription>
                    Be our eyes and ears in spotting fake news
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    When you encounter suspicious information online:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Take note of the source, URL, and key claims</li>
                    <li>Check if it's already been reported on SnitchOn</li>
                    <li>If not, create a detailed entry with evidence</li>
                    <li>Include context and why you believe it's false</li>
                  </ol>
                  <Button onClick={() => navigate("/dashboard")} className="mt-4">
                    Report Fake News
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="md:flex flex-row-reverse">
              <div className="md:w-2/5">
                <img 
                  src={volunteerCommunityImg} 
                  alt="Volunteer community illustration" 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Volunteer Opportunities
                  </CardTitle>
                  <CardDescription>
                    Join our community of fact-checkers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-1">Content Verifier</h4>
                      <p className="text-sm text-muted-foreground">
                        Help verify submitted entries by cross-checking sources and providing additional evidence
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-1">Research Contributor</h4>
                      <p className="text-sm text-muted-foreground">
                        Conduct in-depth research on trending topics and compile fact-checking resources
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-1">Community Moderator</h4>
                      <p className="text-sm text-muted-foreground">
                        Help maintain quality discussions and ensure guidelines are followed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src={spreadAwarenessImg} 
                  alt="Spread awareness illustration" 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Spread the Word
                  </CardTitle>
                  <CardDescription>
                    Help others discover reliable information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Share SnitchOn with your network and help create a more informed community.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareOnSocial('twitter')}
                    >
                      Share on Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareOnSocial('facebook')}
                    >
                      Share on Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareOnSocial('linkedin')}
                    >
                      Share on LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="md:flex flex-row-reverse">
              <div className="md:w-2/5">
                <img 
                  src={stayConnectedImg} 
                  alt="Stay connected illustration" 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Stay Connected
                  </CardTitle>
                  <CardDescription>
                    Get updates on misinformation trends and fact-checking tips
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Join our newsletter to receive weekly digests of newly reported fake news, 
                    fact-checking resources, and media literacy tips.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
                    />
                    <Button>Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-3 text-center">Make an Impact Today</h3>
              <p className="text-center text-muted-foreground mb-6">
                Truth thrives when communities come together. Your contribution, 
                no matter how small, helps create a more informed society.
              </p>
              <div className="flex justify-center">
                <Button size="lg" onClick={() => navigate("/dashboard")}>
                  Get Started Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowYouCanHelp;
