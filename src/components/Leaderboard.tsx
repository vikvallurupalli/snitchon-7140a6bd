import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Contributor {
  alias: string;
  entry_count: number;
}

export const Leaderboard = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const { data, error } = await supabase.rpc("get_top_contributors", {
          limit_count: 5,
        });

        if (error) throw error;
        setContributors(data || []);
      } catch (error) {
        console.error("Failed to fetch top contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopContributors();
  }, []);

  if (loading) {
    return (
      <div className="w-full lg:w-64 bg-card border rounded-xl shadow-card p-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <h3 className="font-semibold text-sm">Top Contributors</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg:w-64 bg-card border rounded-xl shadow-card p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <h3 className="font-semibold text-sm">Top Contributors</h3>
      </div>
      <div className="space-y-2">
        {contributors.map((contributor, index) => (
          <div
            key={contributor.alias}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0
                  ? "bg-yellow-500 text-yellow-950"
                  : index === 1
                  ? "bg-gray-300 text-gray-700"
                  : index === 2
                  ? "bg-amber-600 text-amber-50"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{contributor.alias}</p>
              <p className="text-xs text-muted-foreground">
                {contributor.entry_count}{" "}
                {contributor.entry_count === 1 ? "report" : "reports"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
