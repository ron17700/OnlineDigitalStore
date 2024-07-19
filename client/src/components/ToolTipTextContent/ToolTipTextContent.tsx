import { Text, TEXT_OVERFLOW } from "../Text/Text";
import { colors } from "../../styles/colors";
import "./tool-tip-text-content.scss";

interface ToolTipTextContentProps {
  toolTipText: string;
  theme?: "light" | "dark";
  style?: React.CSSProperties;
}

export const ToolTipTextContent: React.FC<ToolTipTextContentProps> = ({
  toolTipText,
  theme = "dark",
  style,
}) => {
  return (
    <div className={`tool-tip-text-content-container ${theme}`} style={style}>
      <Text
        text={toolTipText}
        color={theme === "dark" ? colors.white : colors.gray01}
        textOverflow={TEXT_OVERFLOW.PRE_LINE}
      />
    </div>
  );
};
