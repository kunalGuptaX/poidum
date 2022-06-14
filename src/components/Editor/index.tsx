/* eslint-disable import/no-anonymous-default-export */
import dynamic from "next/dynamic";

export * from "./InlineFormattingToolbar";

const DynamicComponentWithNoSSR = dynamic(() => import("./Editor"), {
  ssr: false,
});

// eslint-disable-next-line react/display-name
export default () => <DynamicComponentWithNoSSR />;
