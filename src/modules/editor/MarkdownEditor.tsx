import {
  Editor,
  defaultValueCtx,
  editorViewOptionsCtx,
  rootCtx,
} from "@milkdown/core";
import {
  listener,
  listenerCtx,
} from "@milkdown/plugin-listener";
import { commonmark } from "@milkdown/preset-commonmark";
import { gfm } from "@milkdown/preset-gfm";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { replaceAll } from "@milkdown/utils";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import "./markdown-editor.css";

type Props = {
  content: string;
  onContentChange?: (markdown: string) => void;
  className?: string;
};

function MarkdownEditorInner({ content, onContentChange, className }: Props) {
  const lastEmittedRef = useRef<string>(content);
  const onContentChangeRef = useRef(onContentChange);
  onContentChangeRef.current = onContentChange;

  const { get } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, content);
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            "data-milkdown-editor": "true",
          },
        }));
        ctx.get(listenerCtx).markdownUpdated((_ctx, md, prevMd) => {
          if (md === prevMd) return;
          lastEmittedRef.current = md;
          onContentChangeRef.current?.(md);
        });
      })
      .use(commonmark)
      .use(gfm)
      .use(listener),
  );

  // External content updates (e.g., user edited in Raw and toggled back to Rendered):
  // push them into the editor. Skip the echo case where we just emitted this content.
  useEffect(() => {
    if (content === lastEmittedRef.current) return;
    const editor = get();
    if (!editor) return;
    editor.action(replaceAll(content));
    lastEmittedRef.current = content;
  }, [content, get]);

  return (
    <div
      className={cn(
        "markdown-editor min-h-full px-6 py-4",
        className,
      )}
    >
      <Milkdown />
    </div>
  );
}

export function MarkdownEditor(props: Props) {
  return (
    <MilkdownProvider>
      <MarkdownEditorInner {...props} />
    </MilkdownProvider>
  );
}
