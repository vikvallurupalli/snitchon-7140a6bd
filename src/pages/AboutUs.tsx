import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, Users, Globe, Target, Heart, Shield } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Back Button */}
      <nav className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-12 pb-16 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-elevated animate-fade-in">
          <Heart className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
          About SnitchOn
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          A community-driven initiative to combat misinformation, one truth at a time.
        </p>
      </header>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-20 space-y-12 max-w-4xl">
        {/* The Story */}
        <Card className="glass-card hover-card-effect animate-fade-in">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It All Started</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Media opulence was the norm for our generation of kids. I have witnessed firsthand 
              the devastating impact of fake news and misinformation on communities, families, and society at large. 
              In an era where information spreads at lightning speed, i noticed how false narratives could 
              influence opinions, create division, and even endanger lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as concern grew into determination. I realized that fighting misinformation 
              couldn't be a solo effort—it required a global, community-driven approach. The idea was simple 
              yet powerful: empower everyday people to become fact-checkers, truth-seekers, and defenders of 
              accurate information.<br> Vikram V</br>
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="glass-card hover-card-effect animate-fade-in">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To create a global platform where truth prevails over misinformation. We believe that by 
              bringing together concerned citizens from all walks of life, we can build a comprehensive 
              database of verified information and debunked fake news that serves as a shield against 
              the spread of falsehoods.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is not just to identify fake news, but to educate, empower, and equip individuals 
              with the tools and knowledge they need to critically evaluate information before sharing it.
            </p>
          </CardContent>
        </Card>

        {/* Why Community-Driven */}
        <Card className="glass-card hover-card-effect animate-fade-in">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Community-Driven?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Misinformation is not a problem that can be solved by a single organization or government. 
              It's a societal challenge that requires the collective vigilance and action of communities 
              worldwide. When we work together, sharing knowledge and verifying information collaboratively, 
              we create a network of truth that is far more powerful than any individual effort.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every report submitted, every fake news entry documented, and every piece of misinformation 
              debunked contributes to a safer, more informed global community. Together, we're not just 
              fighting fake news—we're building a culture of truth and accountability.
            </p>
          </CardContent>
        </Card>

        {/* Global Vision */}
        <Card className="glass-card hover-card-effect animate-fade-in">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Global Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Truth is accessible to everyone, everywhere</span>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Communities are equipped to identify and combat misinformation</span>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Media literacy is a fundamental skill taught from an early age</span>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Social media platforms prioritize accuracy over sensationalism</span>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Citizens actively participate in preserving the integrity of information</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Join Us */}
        <Card className="glass-card hover-card-effect animate-fade-in bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Join the Movement</h2>
            <p className="text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Whether you're a student like Vik, a concerned parent, a teacher, or simply someone who 
              cares about truth—there's a place for you in this movement. Together, we can make a difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/how-you-can-help")}
                className="gap-2"
              >
                <Users className="w-5 h-5" />
                How You Can Help
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="gap-2 bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              >
                <Shield className="w-5 h-5" />
                Start Reporting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
