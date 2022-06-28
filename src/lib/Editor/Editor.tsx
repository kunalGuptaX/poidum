import {
  convertFromRaw,
  EditorState,
  Editor as DraftEditor,
  convertToRaw,
  RichUtils,
  getVisibleSelectionRect,
  DraftModel,
} from "draft-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getBlockType,
  getDocumentSelectionPosition,
  getEditorContainerPosition,
  getEditorSelectionNode,
  getEditorSelectionOffsetKey,
  getEditorSelectionTopPosition,
  getInlineStyleTypes,
  handleKeyCommands,
  insertImage,
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
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from "@chakra-ui/react";
import Image from "next/image";

export interface EditorProps {
  placeholder?: string;
  value?: Draft.DraftModel.Encoding.RawDraftContentState;
  onChange?: (
    editorState: EditorState,
    value?: Draft.DraftModel.Encoding.RawDraftContentState
  ) => void;
  editorState?: EditorState;
  readOnly?: boolean;
}

const EditorContext = createContext<{
  onChangeEditorState: (editorState: EditorState) => void;
  editorState: EditorState;
}>({
  onChangeEditorState: () => {},
  editorState: EditorState.createWithContent(emptyContentState),
});

export const useEditor = () => useContext(EditorContext);

const Editor = ({
  placeholder,
  onChange,
  value,
  editorState: controlledEditorState,
  readOnly,
}: EditorProps) => {
  const [cursorPos, setCursorPos] = useState<any>(DEFAULT_CURSOR_POSITION);
  const [uncontrolledEditorState, setUncontrolledEditorState] = useState(() =>
    EditorState.createWithContent(
      value ? convertFromRaw(value) : emptyContentState
    )
  );
  const [entityToolbarTopPos, setEntityToolbarTopPos] = useState<number | null>(
    null
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
        getEditorSelectionNode(editorState)?.offsetTop;

      if (
        editorSelectionTopPosition !== null &&
        documentSelectionPosition !== null &&
        editorContainerPosition
      ) {
        const combinedLeft =
          documentSelectionPosition.left +
          TOOLBAR_DEFAULT_LEFT -
          editorContainerPosition.left;
        setCursorPos({
          top: (editorSelectionTopPosition || 0) - 50,
          left: combinedLeft > 0 - TOOLBAR_DEFAULT_LEFT ? combinedLeft : 0,
        });
      }
    }
    setTimeout(() => {
      if (editorState.getSelection().getHasFocus()) {
        setEntityToolbarTopPos(getEditorSelectionTopPosition(editorState));
      }
    });
  }, [editorState]);

  const handleEditorStateChange = (state: EditorState) => {
    setUncontrolledEditorState(state);
    onChange?.(state, convertToRaw(state.getCurrentContent()));
  };

  const handleToggleFormattingOption = (blockType: string) => {
    let newState;
    switch (blockType) {
      case "header-small":
      case "header-large":
        newState = RichUtils.toggleBlockType(editorState, blockType);
        break;
      case "CODE":
        newState = RichUtils.toggleCode(editorState);
        break;
      default:
        newState = RichUtils.toggleInlineStyle(editorState, blockType);
        break;
    }

    handleEditorStateChange(newState);
  };

  return (
    <Box position="relative">
      <EditorContext.Provider
        value={{
          editorState,
          onChangeEditorState: handleEditorStateChange,
        }}
      >
        <DraftEditor
          placeholder="Tell your story..."
          editorState={editorState || uncontrolledEditorState}
          onChange={handleEditorStateChange}
          readOnly={readOnly}
          blockRenderMap={blockRenderMap}
          ref={ref}
          handleKeyCommand={(command, state) =>
            handleKeyCommands(command, state, handleEditorStateChange)
          }
          handlePastedFiles={async (file) => {
            console.log(file);
            const newState = await insertImage(editorState, file[0]);
            if (newState) {
              handleEditorStateChange(newState);
              return "handled";
            }
            return "not-handled";
          }}
          keyBindingFn={keyBindingsFn}
          blockRendererFn={(contentBlock) => {
            const type = contentBlock.getType();
            if (type === "atomic") {
              return {
                component: MediaComponent,
                editable: false,
              };
            }
          }}
        />
        {cursorPos && !readOnly ? (
          <InlineFormattingToolbar
            editorRef={ref}
            left={cursorPos?.left}
            top={cursorPos?.top}
            onToggle={handleToggleFormattingOption}
            inlineStyleTypes={inlineStyleTypes}
            blockType={blockType}
          />
        ) : null}
        {!readOnly && <BlockFormattingToolbar top={entityToolbarTopPos} />}
        {/* {cursorPos.top ? <BlockFormattingToolbar top={cursorPos.top} /> : null} */}
      </EditorContext.Provider>
    </Box>
  );
};

const MediaComponent = ({ block, contentState }: any) => {
  const data = block.getEntityAt(0)
    ? contentState.getEntity(block.getEntityAt(0)).getData()
    : null;
  const type = block.getEntityAt(0)
    ? contentState.getEntity(block.getEntityAt(0)).getType()
    : null;
  if (type === "IMAGE") {
    return (
      <Image
        src={data?.src}
        alt="test"
        width={data.width}
        height={data.height}
      />
    );
  }
  return <></>;
};

export default Editor;
