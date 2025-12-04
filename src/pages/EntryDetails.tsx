import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Link as LinkIcon, User, FileText } from "lucide-react";

interface Entry {
  id: string;
  topic_or_person: string;
  short_description: string;
  url: string;
  details: string;
  created_at: string;
}

const EntryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        setError("Entry not found");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("fake_news_entries")
          .select("id, topic_or_person, short_description, url, details, created_at")
          .eq("id", id)
          .single();

        if (error) throw error;
        setEntry(data);
      } catch (err) {
        console.error("Failed to fetch entry", err);
        setError("Failed to load entry details");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error || "Entry not found"}</p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Article Header */}
        <article className="bg-card rounded-2xl shadow-card p-8 md:p-12 space-y-8">
          {/* Topic/Title */}
          <header className="space-y-4 border-b border-border pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {entry.topic_or_person}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(entry.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(entry.created_at)}</span>
              </div>
            </div>
          </header>

          {/* Short Description */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Summary
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {entry.short_description}
            </p>
          </section>

          {/* Source URL */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Source
            </h2>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {entry.url}
            </a>
          </section>

          {/* Full Details */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Full Details
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {entry.details}
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default EntryDetails;
