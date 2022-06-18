import { Heading, Text } from "@chakra-ui/react";
import { convertFromRaw } from "draft-js";
import Immutable from "immutable";

export const blockRenderMap: Draft.DraftComponent.Base.DraftBlockRenderMap =
  Immutable.Map({
    "header-three": {
      element: "h3",
      wrapper: <Heading fontFamily="charter" variant="h3" />,
    },
    "header-two": {
      element: "h2",
      wrapper: <Heading fontFamily="charter" variant="h2" />,
    },
    "header-one": {
      element: "h1",
      wrapper: <Heading fontFamily="charter" variant="h1" />,
    },
    unstyled: {
      element: "p",
      wrapper: <Text fontFamily="charter" fontSize="20px" />,
    },
  });

export const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "content",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

export const TOOLBAR_DEFAULT_LEFT = -40;
export const TOOLBAR_DEFAULT_TOP = 40;
export const DEFAULT_CURSOR_POSITION = {
  top: TOOLBAR_DEFAULT_TOP,
  left: TOOLBAR_DEFAULT_LEFT,
};
