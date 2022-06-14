import { Heading, Text } from "@chakra-ui/react";
import { convertFromRaw } from "draft-js";
import Immutable from "immutable";

export const blockRenderMap: Draft.DraftComponent.Base.DraftBlockRenderMap =
  Immutable.Map({
    "header-three": {
      element: "h3",
      wrapper: <Heading fontFamily="New York" variant="h3" />,
    },
    "header-two": {
      element: "h2",
      wrapper: <Heading fontFamily="New York" variant="h2" />,
    },
    "header-one": {
      element: "h1",
      wrapper: <Heading fontFamily="New York" variant="h1" />,
    },
    unstyled: {
      element: "p",
      wrapper: <Text fontFamily="New York" fontSize="20px" />,
    },
  });

export const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

export const TOOLBAR_DEFAULT_LEFT = -40;
export const TOOLBAR_DEFAULT_TOP = -40;
export const DEFAULT_CURSOR_POSITION = {
  top: TOOLBAR_DEFAULT_TOP,
  left: TOOLBAR_DEFAULT_LEFT,
};
