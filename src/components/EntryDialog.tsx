import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Entry {
  id?: string;
  topic_or_person: string;
  short_description: string;
  url: string;
  details: string;
}

interface EntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: Entry | null;
  onSave: (entry: Partial<Entry>) => void;
}

export const EntryDialog = ({ open, onOpenChange, entry, onSave }: EntryDialogProps) => {
  const [formData, setFormData] = useState({
    topic_or_person: "",
    short_description: "",
    url: "",
    details: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        topic_or_person: entry.topic_or_person,
        short_description: entry.short_description,
        url: entry.url,
        details: entry.details,
      });
    } else {
      setFormData({
        topic_or_person: "",
        short_description: "",
        url: "",
        details: "",
      });
    }
  }, [entry, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{entry ? "Edit Entry" : "Report Fake News"}</DialogTitle>
          <DialogDescription>
            {entry
              ? "Update the details of this fake news entry"
              : "Add a new fake news entry to the database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic_or_person">Topic or Person *</Label>
            <Input
              id="topic_or_person"
              placeholder="e.g., Climate Change, John Doe"
              value={formData.topic_or_person}
              onChange={(e) =>
                setFormData({ ...formData, topic_or_person: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description *</Label>
            <Input
              id="short_description"
              placeholder="Brief summary of the fake news"
              value={formData.short_description}
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Source URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details *</Label>
            <Textarea
              id="details"
              placeholder="Detailed explanation of why this is fake news, including facts and evidence..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required
              rows={8}
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{entry ? "Update Entry" : "Create Entry"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};