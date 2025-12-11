import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Eye, Globe, MessageSquare, Newspaper, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const IdentifyFakeNews = () => {
  const navigate = useNavigate();

  const tips = [
    {
      icon: Newspaper,
      title: "Check the Headline vs. Content",
      warning: "Clickbait headlines often misrepresent the actual story",
      indicators: [
        "Headline uses ALL CAPS or excessive punctuation!!!",
        "Headline makes shocking claims not supported in the article",
        "Sensational language designed to provoke emotional reactions",
        "Questions in headlines that the article doesn't actually answer"
      ],
      action: "Always read beyond the headline before judging or sharing."
    },
    {
      icon: Globe,
      title: "Examine the Source",
      warning: "Fake news often comes from unknown or untrustworthy websites",
      indicators: [
        "Unusual domain names (.com.co, .lo, misspellings)",
        "Website lacks 'About Us' or contact information",
        "Design looks unprofessional or hastily made",
        "Site is known for satire or parody (without clear labeling)",
        "No editorial staff or credentials listed"
      ],
      action: "Research the publication's reputation and history."
    },
    {
      icon: Eye,
      title: "Look for Quality Writing",
      warning: "Legitimate news organizations maintain editorial standards",
      indicators: [
        "Numerous spelling and grammar errors",
        "Poor sentence structure and awkward phrasing",
        "Excessive use of bold, italics, or capital letters",
        "Unprofessional or biased language",
        "Lack of attribution for claims and quotes"
      ],
      action: "Professional journalism follows style guides and fact-checking protocols."
    },
    {
      icon: MessageSquare,
      title: "Verify Supporting Evidence",
      warning: "Real news provides sources and evidence for claims",
      indicators: [
        "No sources cited for statistics or quotes",
        "Vague attributions like 'experts say' or 'studies show'",
        "Links lead to unrelated or non-existent pages",
        "Images or videos taken out of context",
        "Claims without any supporting documentation"
      ],
      action: "Trace claims back to their original sources."
    },
    {
      icon: TrendingUp,
      title: "Check the Date and Context",
      warning: "Old stories can be recirculated as breaking news",
      indicators: [
        "No publication date listed",
        "Story references outdated events as current",
        "Images or videos from different time periods",
        "Story omits important recent developments",
        "Information contradicts recent, verified updates"
      ],
      action: "Verify that the information is current and contextually accurate."
    },
    {
      icon: AlertTriangle,
      title: "Be Aware of Your Own Biases",
      warning: "We're more likely to believe and share information that confirms our beliefs",
      indicators: [
        "The story perfectly aligns with your worldview",
        "It triggers strong emotional reactions (anger, fear, outrage)",
        "You want it to be true (or false) without checking",
        "It confirms your existing opinions about a person or topic",
        "You feel compelled to share it immediately"
      ],
      action: "Apply extra scrutiny to information that strongly resonates with you."
    }
  ];

  const commonTypes = [
    {
      type: "Fabricated Content",
      description: "100% false information designed to deceive",
      example: "Completely invented news stories with no factual basis"
    },
    {
      type: "Manipulated Content",
      description: "Real information altered to mislead",
      example: "Edited photos or videos, altered documents, fake screenshots"
    },
    {
      type: "Imposter Content",
      description: "Pretends to be from credible sources",
      example: "Fake social media accounts impersonating journalists or officials"
    },
    {
      type: "Misleading Content",
      description: "Selective use of true information to deceive",
      example: "Cherry-picked data, quotes taken out of context"
    },
    {
      type: "False Context",
      description: "Real content shared with false contextual information",
      example: "Old photos presented as recent events"
    },
    {
      type: "Satire/Parody",
      description: "Humorous content mistaken for real news",
      example: "Articles from satirical sites shared as fact"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Tips for Identifying Fake News</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn to spot misinformation and develop critical thinking skills.
        </p>

        <Card className="mb-12 bg-destructive/5 border-destructive/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Why Fake News Matters
            </h2>
            <p className="text-muted-foreground mb-3">
              Fake news can influence elections, incite violence, harm reputations, cause financial losses, 
              and undermine trust in legitimate journalism and institutions. Being able to identify it is 
              a crucial skill in the digital age.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8 mb-12">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    {tip.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-destructive mt-2">
                    ⚠️ {tip.warning}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm">Warning Signs:</p>
                    <ul className="space-y-1">
                      {tip.indicators.map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive shrink-0 mt-0.5">▸</span>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-md border border-primary/20">
                    <p className="text-sm font-medium">
                      <span className="text-primary">✓ What to do:</span> {tip.action}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Common Types of Fake News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonTypes.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.type}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    Example: {item.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Remember: Stop, Think, Verify</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">STOP</div>
                <p className="text-sm text-muted-foreground">
                  Don't react or share immediately
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">THINK</div>
                <p className="text-sm text-muted-foreground">
                  Consider the source and context
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">VERIFY</div>
                <p className="text-sm text-muted-foreground">
                  Check with trusted fact-checkers
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/verify-information")}>
                Learn Verification Steps
              </Button>
              <Button variant="outline" onClick={() => navigate("/trusted-tools")}>
                View Fact-Checking Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdentifyFakeNews;
