import { Heading, Text } from "@chakra-ui/react";
import { convertFromRaw } from "draft-js";
import Immutable from "immutable";

export const blockRenderMap: Draft.DraftComponent.Base.DraftBlockRenderMap =
  Immutable.Map({
    "header-large": {
      element: "h3",
      wrapper: (
        <Heading
          fontFamily="charter"
          variant="h3"
          fontSize={42}
          fontWeight={400}
          lineHeight={1.25}
          letterSpacing={0}
          color="rgba(0,0,0,.84)"
        />
      ),
    },
    "header-small": {
      element: "h4",
      wrapper: (
        <Heading
          fontFamily="'Noto Sans JP', sans-serif"
          variant="h4"
          fontSize={26}
          fontWeight={700}
          lineHeight={1.22}
          letterSpacing="-0.012em"
          color="rgba(0,0,0,.84)"
        />
      ),
    },
    unstyled: {
      element: "p",
      wrapper: <Text fontFamily="charter" fontSize="21px" color="rgba(0,0,0,.84)" />,
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
