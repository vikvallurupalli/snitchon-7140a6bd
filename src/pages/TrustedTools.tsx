import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const TrustedTools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      name: "Snopes",
      url: "https://www.snopes.com",
      description: "One of the oldest and most trusted fact-checking websites, debunking urban legends, rumors, and misinformation since 1994.",
      category: "General Fact-Checking"
    },
    {
      name: "FactCheck.org",
      url: "https://www.factcheck.org",
      description: "A nonpartisan project of the Annenberg Public Policy Center that monitors factual accuracy in U.S. politics.",
      category: "Political Fact-Checking"
    },
    {
      name: "PolitiFact",
      url: "https://www.politifact.com",
      description: "Rates the accuracy of claims by elected officials and others using its Truth-O-Meter scale.",
      category: "Political Fact-Checking"
    },
    {
      name: "International Fact-Checking Network (IFCN)",
      url: "https://www.poynter.org/ifcn/",
      description: "A global network of fact-checkers committed to promoting excellence in fact-checking.",
      category: "International"
    },
    {
      name: "Full Fact",
      url: "https://fullfact.org",
      description: "UK's independent fact-checking charity that checks and corrects harmful misinformation.",
      category: "UK Fact-Checking"
    },
    {
      name: "AFP Fact Check",
      url: "https://factcheck.afp.com",
      description: "Global fact-checking service from Agence France-Presse verifying claims in multiple languages.",
      category: "International"
    },
    {
      name: "Google Fact Check Explorer",
      url: "https://toolbox.google.com/factcheck/explorer",
      description: "Search tool for fact-checks published by fact-checking organizations worldwide.",
      category: "Search Tool"
    },
    {
      name: "TinEye Reverse Image Search",
      url: "https://tineye.com",
      description: "Find where an image came from and check if it's been manipulated or taken out of context.",
      category: "Image Verification"
    },
    {
      name: "InVID Verification Plugin",
      url: "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/",
      description: "Browser extension for video and image verification, reverse image search, and metadata analysis.",
      category: "Media Verification"
    },
    {
      name: "Bellingcat",
      url: "https://www.bellingcat.com",
      description: "Investigative journalism group specializing in fact-checking and open source investigation.",
      category: "Investigative"
    },
    {
      name: "Media Bias/Fact Check",
      url: "https://mediabiasfactcheck.com",
      description: "Rates the bias and credibility of media sources and provides detailed methodology.",
      category: "Source Credibility"
    },
    {
      name: "AllSides",
      url: "https://www.allsides.com",
      description: "Shows news from different political perspectives to help identify bias and see the full picture.",
      category: "Source Credibility"
    }
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Trusted Fact-Checking Tools & Websites</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Reliable resources to help you verify information and identify misinformation.
        </p>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground border-b pb-2">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <Card key={tool.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {tool.name}
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {tool.url}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        Visit Website
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-3">Using These Tools Effectively</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Cross-reference claims across multiple fact-checking sources</li>
              <li>• Check the publication date to ensure information is current</li>
              <li>• Look at the methodology used by fact-checkers</li>
              <li>• Verify images and videos using reverse search tools</li>
              <li>• Be aware of the political bias of your sources</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustedTools;
