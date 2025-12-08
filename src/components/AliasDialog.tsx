import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AliasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentAlias?: string | null;
  onSuccess: () => void;
}

export const AliasDialog = ({
  open,
  onOpenChange,
  userId,
  currentAlias,
  onSuccess,
}: AliasDialogProps) => {
  const [alias, setAlias] = useState(currentAlias || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedAlias = alias.trim();
    if (trimmedAlias.length < 3) {
      setError("Alias must be at least 3 characters");
      return;
    }

    if (trimmedAlias.length > 30) {
      setError("Alias must be 30 characters or less");
      return;
    }

    setLoading(true);
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ alias: trimmedAlias })
          .eq("user_id", userId);

        if (updateError) {
          if (updateError.code === "23505") {
            setError("This alias is already taken. Please choose another.");
            return;
          }
          throw updateError;
        }
      } else {
        // Insert new profile
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ user_id: userId, alias: trimmedAlias });

        if (insertError) {
          if (insertError.code === "23505") {
            setError("This alias is already taken. Please choose another.");
            return;
          }
          throw insertError;
        }
      }

      toast({ title: "Success", description: "Alias saved successfully" });
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to save alias:", err);
      toast({
        title: "Error",
        description: "Failed to save alias. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentAlias ? "Edit Your Alias" : "Choose Your Alias"}
          </DialogTitle>
          <DialogDescription>
            {currentAlias
              ? "Update your display name visible to other users."
              : "Please choose a unique alias. This will be your display name visible to other users."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alias">Alias</Label>
            <Input
              id="alias"
              placeholder="Enter your alias (3-30 characters)"
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
                setError(null);
              }}
              minLength={3}
              maxLength={30}
              required
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            {currentAlias && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Alias"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
