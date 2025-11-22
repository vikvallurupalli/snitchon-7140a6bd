import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, LogOut, Shield, Pencil, Trash2, ExternalLink } from "lucide-react";
import { EntryDialog } from "@/components/EntryDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Entry {
  id: string;
  user_id: string;
  user_email: string;
  topic_or_person: string;
  short_description: string;
  url: string;
  details: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    checkAuth();
    fetchEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [searchQuery, entries]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
    setEmail(session.user.email);
  };

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("fake_news_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEntries = () => {
    if (!searchQuery.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = entries.filter(
      (entry) =>
        entry.topic_or_person.toLowerCase().includes(query) ||
        entry.short_description.toLowerCase().includes(query) ||
        entry.details.toLowerCase().includes(query)
    );
    setFilteredEntries(filtered);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSaveEntry = async (entryData: Partial<Entry>) => {
    try {
      if (editingEntry) {
        const { error } = await supabase
          .from("fake_news_entries")
          .update(entryData)
          .eq("id", editingEntry.id);

        if (error) throw error;
        toast({ title: "Success", description: "Entry updated successfully" });
      } else {
        const newEntry = {
          topic_or_person: entryData.topic_or_person!,
          short_description: entryData.short_description!,
          url: entryData.url!,
          details: entryData.details!,
          user_id: userId!,
          user_email: email!,
        };
        
        const { error } = await supabase
          .from("fake_news_entries")
          .insert(newEntry);

        if (error) throw error;
        toast({ title: "Success", description: "Entry created successfully" });
      }

      setDialogOpen(false);
      setEditingEntry(null);
      fetchEntries();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save entry",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("fake_news_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Entry deleted successfully" });
      fetchEntries();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      });
    }
  };

  const handleAddNew = () => {
    setEditingEntry(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">SnitchOn--back</h1>
            <h1>
              <Button  onClick={() => navigate("/")} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by topic, person, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button onClick={handleAddNew} size="lg" className="h-12 gap-2">
            <Plus className="w-5 h-5" />
            Report Fake News
          </Button>
        </div>

        {/* Entries Table */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-xl text-muted-foreground">
              {searchQuery ? "No entries found matching your search" : "No entries yet"}
            </p>
            {!searchQuery && (
              <Button onClick={handleAddNew} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create First Entry
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic/Person</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="hidden lg:table-cell">Details</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.topic_or_person}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.short_description}</TableCell>
                    <TableCell>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Link
                      </a>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-md truncate">
                      {entry.details}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.user_id === userId && (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(entry)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this entry? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Entry Dialog */}
      <EntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={editingEntry}
        onSave={handleSaveEntry}
      />
    </div>
  );
};

export default Dashboard;
