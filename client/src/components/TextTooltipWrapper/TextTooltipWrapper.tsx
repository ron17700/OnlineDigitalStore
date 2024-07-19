import Tippy, { TippyProps } from "@tippyjs/react";
import { ReactNode } from "react";
import { ToolTipTextContent } from "../ToolTipTextContent/ToolTipTextContent";
import { getClassName } from "../../Utils/getClassName";
import "./text-tooltip-wrapper.scss";

interface TextTooltipWrapperProps {
  children: ReactNode;
  text: string;
  theme?: "light" | "dark";
  delay?: null | number;
  hide?: boolean;
  className?: string;
  tooltipProps?: TippyProps;
}

export const TextTooltipWrapper: React.FC<TextTooltipWrapperProps> = ({
  theme = "dark",
  children,
  delay = 500,
  text,
  hide,
  className,
  tooltipProps,
}) => {
  return (
    <Tippy
      animation="scale-opacity"
      content={<ToolTipTextContent toolTipText={text} theme={theme} />}
      delay={[delay, 0]}
      disabled={hide}
      interactive={true}
      appendTo={document.body}
      {...tooltipProps}
    >
      <div className={getClassName(`${className}`)}>{children}</div>
    </Tippy>
  );
};
