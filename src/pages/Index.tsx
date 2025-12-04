import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Shield, Search, Users, AlertTriangle, BookOpen, CheckCircle, ExternalLink, Info, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Entry {
  id: string;
  topic_or_person: string;
  short_description: string;
  url: string;
  details: string;
  created_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [recentEntries, setRecentEntries] = useState<Entry[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
    
    // Fetch 5 most recent entries
    const fetchRecentEntries = async () => {
      const { data } = await supabase
        .from("fake_news_entries")
        .select("id, topic_or_person, short_description, url, details, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setRecentEntries(data);
    };
    fetchRecentEntries();
  }, [navigate]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("fake_news_entries")
        .select("id, topic_or_person, short_description, url, details, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Failed to fetch entries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim().length < 3) {
      setFilteredEntries([]);
      setHasSearched(false);
      return;
    }
    if (!hasSearched) {
      await fetchEntries();
      setHasSearched(true);
    }
  };

  useEffect(() => {
    // Clear results if search query is less than 3 characters
    if (searchQuery.trim().length < 3) {
      setFilteredEntries([]);
      setHasSearched(false);
      return;
    }

    if (!hasSearched) return;

    const query = searchQuery.toLowerCase();
    const filtered = entries.filter(
      (entry) =>
        entry.topic_or_person.toLowerCase().includes(query) ||
        entry.short_description.toLowerCase().includes(query) ||
        entry.details.toLowerCase().includes(query)
    );
    setFilteredEntries(filtered);
  }, [searchQuery, entries, hasSearched]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length < 3) {
      return;
    }
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      {/* Navigation */}
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

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-elevated animate-fade-in">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                SnitchOn
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Report and search for fake news. Help keep information accurate and trustworthy.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl animate-fade-in">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for fake news by topic, person, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-14 text-lg"
                    minLength={3}
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8"
                  disabled={searchQuery.trim().length < 3}
                >
                  Search
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter at least 3 characters to search
              </p>
            </form>
          </div>

          {/* Recent Entries Card */}
          {recentEntries.length > 0 && (
            <div className="w-full lg:w-80 bg-card border rounded-xl shadow-card p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Recent Reports</h3>
              </div>
              <div className="space-y-2">
                {recentEntries.map((entry) => (
                  <Link
                    key={entry.id}
                    to={`/entry/${entry.id}`}
                    className="block p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium truncate">{entry.topic_or_person}</p>
                    <p className="text-xs text-muted-foreground truncate">{entry.short_description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Results */}
      {hasSearched && (
        <section className="container mx-auto px-4 pb-10">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading entries...</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? "No entries found matching your search" : "No entries yet"}
            </div>
          ) : (
            <div className="rounded-lg border bg-card max-w-6xl mx-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic/Person</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.topic_or_person}</TableCell>
                      <TableCell className="max-w-xs truncate">{entry.short_description}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedUrl(entry.url)}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Link
                        </button>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/entry/${entry.id}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      )}

      {/* URL Popup Dialog */}
      <Dialog open={!!selectedUrl} onOpenChange={() => setSelectedUrl(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Source URL
            </DialogTitle>
          </DialogHeader>
          {selectedUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <span className="text-sm break-all flex-1">{selectedUrl}</span>
              </div>
              <div className="border rounded-lg overflow-hidden h-[60vh] relative">
                <iframe
                  src={selectedUrl}
                  title="Source content"
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/90 opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-sm text-muted-foreground mb-4 text-center px-4">
                    Some websites block preview embedding for security reasons.
                  </p>
                  <a
                    href={selectedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <section className="container mx-auto px-4 pt-10 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            onClick={() => navigate("/auth")}
            className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl">
              <AlertTriangle className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Report Fake News</h3>
            <p className="text-muted-foreground">
              Contribute to the database by reporting misinformation with detailed evidence and sources
            </p>
          </div>

          <div 
            onClick={() => navigate("/dashboard")}
            className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl">
              <Search className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Search & Verify</h3>
            <p className="text-muted-foreground">
              Quickly search through reported fake news to verify claims and find the truth
            </p>
          </div>

          <div 
            onClick={() => navigate("/how-you-can-help")}
            className="text-center space-y-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all cursor-pointer"
          >
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
