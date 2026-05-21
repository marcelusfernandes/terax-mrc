import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { MarkdownView } from "@/modules/settings/store";

type Props = {
  value: MarkdownView;
  onChange: (next: MarkdownView) => void;
  className?: string;
};

export function MarkdownToolbar({ value, onChange, className }: Props) {
  return (
    <div
      className={cn(
        "flex h-9 shrink-0 items-center justify-end border-b border-border/60 px-2",
        className,
      )}
    >
      <ToggleGroup
        type="single"
        value={value}
        variant="outline"
        size="sm"
        onValueChange={(v) => {
          if (v === "rendered" || v === "raw") onChange(v);
        }}
        aria-label="Markdown view mode"
      >
        <ToggleGroupItem value="rendered" aria-label="Rendered">
          Rendered
        </ToggleGroupItem>
        <ToggleGroupItem value="raw" aria-label="Raw">
          Raw
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
