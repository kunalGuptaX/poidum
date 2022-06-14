import {
  convertFromRaw,
  EditorState,
  Editor as DraftEditor,
  convertToRaw,
  RichUtils,
} from "draft-js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getBlockType,
  getDocumentSelectionPosition,
  getEditorContainerPosition,
  getEditorSelectionTopPosition,
  getInlineStyleTypes,
  handleKeyCommands,
  keyBindingsFn,
} from "./helpers";
import "draft-js/dist/Draft.css";
import { InlineFormattingToolbar } from "./InlineFormattingToolbar";
import {
  blockRenderMap,
  DEFAULT_CURSOR_POSITION,
  emptyContentState,
  TOOLBAR_DEFAULT_LEFT,
  TOOLBAR_DEFAULT_TOP,
} from "./constants";
import BlockFormattingToolbar from "./BlockFormattingToolbar";

export interface EditorProps {
  placeholder?: string;
  value?: Draft.DraftModel.Encoding.RawDraftContentState;
  onChange?: (
    editorState: EditorState,
    value?: Draft.DraftModel.Encoding.RawDraftContentState
  ) => void;
  editorState?: EditorState;
}

const Editor = ({
  placeholder,
  onChange,
  value,
  editorState: controlledEditorState,
}: EditorProps) => {
  const [cursorPos, setCursorPos] = useState<any>(DEFAULT_CURSOR_POSITION);
  const [uncontrolledEditorState, setUncontrolledEditorState] = useState(() =>
    EditorState.createWithContent(
      value ? convertFromRaw(value) : emptyContentState
    )
  );

  const ref = useRef<DraftEditor>(null);

  const editorState = controlledEditorState || uncontrolledEditorState;
  const blockType = useMemo(() => getBlockType(editorState), [editorState]);
  const inlineStyleTypes = useMemo(
    () => getInlineStyleTypes(editorState),
    [editorState]
  );

  useEffect(() => {
    const editorSelection = editorState.getSelection();
    const isSelectionEnabled =
      editorSelection.getAnchorOffset() - editorSelection.getFocusOffset();
    if (isSelectionEnabled === 0 || !editorSelection.getHasFocus()) {
      setCursorPos(null);
    } else {
      const editorContainerPosition = getEditorContainerPosition();
      const documentSelectionPosition = getDocumentSelectionPosition();

      const editorSelectionTopPosition =
        getEditorSelectionTopPosition(editorState);
      if (
        editorSelectionTopPosition !== null &&
        documentSelectionPosition !== null &&
        editorContainerPosition
      ) {
        const combinedLeft =
          documentSelectionPosition.left -
          editorContainerPosition.left +
          TOOLBAR_DEFAULT_LEFT;

        setCursorPos({
          top: editorSelectionTopPosition + TOOLBAR_DEFAULT_TOP,
          left: combinedLeft > 0 - TOOLBAR_DEFAULT_LEFT ? combinedLeft : 0,
        });
      }
    }
  }, [editorState]);

  const handleEditorStateChange = (state: EditorState) => {
    setUncontrolledEditorState(state);
    onChange?.(state, convertToRaw(state.getCurrentContent()));
  };

  const handleToggleFormattingOption = (blockType: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, blockType);
    handleEditorStateChange(newState);
  };

  return (
    <>
      <DraftEditor
        placeholder={placeholder}
        editorState={editorState || uncontrolledEditorState}
        onChange={handleEditorStateChange}
        blockRenderMap={blockRenderMap}
        ref={ref}
        handleKeyCommand={(command, state) =>
          handleKeyCommands(command, state, handleEditorStateChange)
        }
        keyBindingFn={keyBindingsFn}
      />
      {cursorPos ? (
        <InlineFormattingToolbar
          editorRef={ref}
          left={cursorPos?.left}
          top={cursorPos?.top}
          onToggle={handleToggleFormattingOption}
          inlineStyleTypes={inlineStyleTypes}
        />
      ) : null}
      {/* {cursorPos.top ? <BlockFormattingToolbar top={cursorPos.top} /> : null} */}
    </>
  );
};
export default Editor;
