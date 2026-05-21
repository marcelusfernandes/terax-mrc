import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MarkdownView } from "@/modules/settings/store";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { EditorPane, type EditorPaneHandle } from "./EditorPane";
import { forwardRef } from "react";

type Props = {
  path: string;
  markdownView?: MarkdownView;
  onMarkdownViewChange: (next: MarkdownView) => void;
  onClose: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  className?: string;
};

function basename(path: string): string {
  const parts = path.split(/[\\/]/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : path;
}

export const SideMarkdownPanel = forwardRef<EditorPaneHandle, Props>(
  function SideMarkdownPanel(
    {
      path,
      markdownView,
      onMarkdownViewChange,
      onClose,
      onDirtyChange,
      className,
    },
    ref,
  ) {
    return (
      <div
        className={cn(
          "flex h-full min-h-0 flex-col overflow-hidden border-l border-border/60 bg-background",
          className,
        )}
      >
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 px-3">
          <span className="truncate text-[12px] font-medium text-foreground/85">
            {basename(path)}
          </span>
          <span className="ml-auto" />
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onClose}
            aria-label="Close side panel"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={14}
              strokeWidth={2}
            />
          </Button>
        </div>
        <div className="min-h-0 flex-1">
          <EditorPane
            ref={ref}
            path={path}
            markdownView={markdownView}
            onMarkdownViewChange={onMarkdownViewChange}
            onDirtyChange={onDirtyChange}
            onClose={onClose}
          />
        </div>
      </div>
    );
  },
);
