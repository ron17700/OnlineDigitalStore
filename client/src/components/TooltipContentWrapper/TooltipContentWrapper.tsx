import Tippy, { TippyProps } from "@tippyjs/react";
import { ReactNode } from "react";
import { ToolTipTextContent } from "../ToolTipTextContent/ToolTipTextContent";
import { getClassName } from "../../Utils/getClassName";
import "./tooltip-content-wrapper.scss";

interface TooltipContentWrapperProps {
  children: ReactNode;
  content: ReactNode;
  theme?: "light" | "dark";
  delay?: null | number;
  hide?: boolean;
  className?: string;
  tooltipProps?: TippyProps;
}

export const TooltipContentWrapper: React.FC<TooltipContentWrapperProps> = ({
  theme = "dark",
  children,
  delay = 500,
  content,
  hide,
  className,
  tooltipProps,
}) => {
  return (
    <Tippy
      animation="scale-opacity"
      content={
        typeof content === "string" ? (
          <ToolTipTextContent toolTipText={content} theme={theme} />
        ) : (
          content
        )
      }
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
