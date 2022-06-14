import {
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from "draft-js";
// @ts-ignore
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

export const DRAFT_EDITOR_CLASSNAME = "DraftEditor-root";

export const getDocumentSelectionPosition: () => DOMRect | null = () => {
  if (
    typeof document !== "undefined" &&
    document.getSelection()?.rangeCount! >= 1
  ) {
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

export const mapKeyCodeToInlineStyle = (keyCode: number) => {
  switch (keyCode) {
    case 66:
      return "BOLD";
    case 73:
      return "ITALIC";
    case 85:
      return "UNDERLINE";
    default:
      return null;
  }
};

export const keyBindingsFn = (e: React.KeyboardEvent): string | null => {
  if (!KeyBindingUtil.hasCommandModifier(e)) {
    return getDefaultKeyBinding(e);
  }

  let value;

  if (typeof navigator !== "undefined") {
    const isMac = navigator.userAgent.includes("Mac");
    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
      value = mapKeyCodeToInlineStyle(e.keyCode);
    }
  }

  return value || getDefaultKeyBinding(e);
};

export const handleKeyCommands = (
  command: string,
  editorState: EditorState,
  changeState: (editorState: EditorState) => void
): DraftHandleValue => {
  switch (command) {
    case "BOLD":
      changeState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      return "handled";
    case "ITALIC":
      changeState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
      return "handled";
    case "UNDERLINE":
      changeState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
      return "handled";
    default:
      return "not-handled";
  }
};

export const getBlockType = (editorState: EditorState) =>
  editorState
    .getCurrentContent()
    .getBlockForKey(getEditorSelectionState(editorState).getStartKey())
    .getType();

export const getInlineStyleTypes = (editorState: EditorState): string[] =>
  editorState.getCurrentInlineStyle().toArray();
