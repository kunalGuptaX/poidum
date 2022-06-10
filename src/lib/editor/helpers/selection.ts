import { EditorState } from "draft-js";
// @ts-ignore
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

export const DRAFT_EDITOR_CLASSNAME = "DraftEditor-root";

export const getDocumentSelectionPosition: () => DOMRect | null = () => {
  if (typeof document !== "undefined") {
    return (
      document.getSelection()?.getRangeAt(0).getBoundingClientRect() || null
    );
  }
  return null;
};

export const getEditorContainerPosition: () => DOMRect | null = () => {
  if (typeof document !== "undefined") {
    return (
      document
        .getElementsByClassName(DRAFT_EDITOR_CLASSNAME)?.[0]
        .getBoundingClientRect() || null
    );
  }
  return null;
};

export const getEditorSelectionState = (editorState: EditorState) => {
  return editorState.getSelection();
};

/**
 *
 * @param editorState Draft-JS editorState
 * @returns returns the current active element node of draftjs editor
 */
export const getEditorSelectionNode: (
  editorState: EditorState
) => HTMLDivElement | null = (editorState: EditorState) => {
  if (typeof document !== "undefined") {
    const selection = getEditorSelectionState(editorState);
    const currentContent = editorState!.getCurrentContent();
    const currentBlock = currentContent?.getBlockForKey(
      selection.getStartKey()
    );
    const offsetKey = DraftOffsetKey?.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelector<HTMLDivElement>(
      `[data-offset-key="${offsetKey}"]`
    );
    return node || null;
  }
  return null;
};

/**
 *
 * @param editorState Draft-JS editorState
 * @returns Absolute Top position from the parent relative div of active editor line
 */
export const getEditorSelectionTopPosition: (
  editorState: EditorState
) => number | null = (editorState: EditorState) => {
  const node = getEditorSelectionNode(editorState);
  if (node) {
    return node.offsetTop;
  }
  return null;
};
