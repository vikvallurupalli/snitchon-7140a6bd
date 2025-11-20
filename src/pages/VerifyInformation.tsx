import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Search, Link as LinkIcon, Image, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyInformation = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: CheckCircle2,
      title: "Pause Before You Share",
      description: "Take a moment to think critically. Does this information trigger a strong emotional response? That's often a red flag.",
      tips: [
        "Don't share immediately, even if it aligns with your views",
        "Ask yourself: 'Why was this shared with me?'",
        "Check if the headline matches the actual content"
      ]
    },
    {
      icon: Search,
      title: "Check the Source",
      description: "Investigate who created and published the information.",
      tips: [
        "Look for an 'About Us' page on the website",
        "Check if the source is known for credible journalism",
        "Search for the publication's reputation and track record",
        "Be wary of sites with unusual domain names (.co instead of .com, etc.)"
      ]
    },
    {
      icon: Users,
      title: "Verify the Author",
      description: "Research the person or organization behind the content.",
      tips: [
        "Search the author's name with 'credentials' or 'background'",
        "Check if they're an expert in the relevant field",
        "Look for their social media profiles and other work",
        "Be cautious of anonymous or generic author names"
      ]
    },
    {
      icon: Calendar,
      title: "Check the Date",
      description: "Make sure the information is current and hasn't been taken out of context.",
      tips: [
        "Look for publication and last-updated dates",
        "Old news can be recirculated as current events",
        "Verify that photos/videos match the claimed timeframe",
        "Check if there have been updates or corrections since publication"
      ]
    },
    {
      icon: LinkIcon,
      title: "Trace the Original Source",
      description: "Follow claims back to their origin.",
      tips: [
        "Click through to original studies or statements cited",
        "Verify quotes and statistics at their source",
        "Check if the original source actually says what's claimed",
        "Look for primary sources, not just secondary reporting"
      ]
    },
    {
      icon: Image,
      title: "Verify Images and Videos",
      description: "Use reverse image search and video verification tools.",
      tips: [
        "Use Google Reverse Image Search or TinEye",
        "Check for signs of manipulation (inconsistent lighting, blurred edges)",
        "Look for the original context of images and videos",
        "Use InVID browser extension for video verification"
      ]
    },
    {
      icon: Search,
      title: "Cross-Reference with Multiple Sources",
      description: "Don't rely on a single source for important information.",
      tips: [
        "Check if reputable news outlets are reporting the same story",
        "Look at sources from different perspectives",
        "Compare how different outlets frame the information",
        "Use fact-checking websites to verify specific claims"
      ]
    },
    {
      icon: CheckCircle2,
      title: "Consult Fact-Checking Resources",
      description: "Use established fact-checking organizations.",
      tips: [
        "Check Snopes, FactCheck.org, or PolitiFact",
        "Search 'fact check' along with the claim",
        "Look at international fact-checkers for global stories",
        "Use Google Fact Check Explorer for comprehensive results"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-8"
        >
          ← Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-4 text-foreground">Steps to Verify Online Information</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A systematic approach to checking facts and avoiding misinformation.
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <Icon className="h-6 w-6 text-primary" />
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Quick Verification Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold">✓ Before Sharing, Ask:</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>□ Is the source credible?</li>
                  <li>□ Is the author qualified?</li>
                  <li>□ Is this current information?</li>
                  <li>□ Have I checked the original source?</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">✓ Red Flags to Watch For:</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>⚠ Emotionally manipulative language</li>
                  <li>⚠ Sensational or clickbait headlines</li>
                  <li>⚠ No author or source information</li>
                  <li>⚠ Poor grammar and spelling</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button onClick={() => navigate("/trusted-tools")}>
                View Trusted Fact-Checking Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyInformation;
