import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { colors } from "../../styles/colors";
import { RawText } from "../RawText/RawText";

export const OceanLogo: React.FC = () => {
  return (
    <div className="flex align-center column-gap-8">
      <ShoppingBagIcon color={colors.blue03} height="24px" width="24px" />
      <RawText
        text="Ocean"
        fontFamily="Courgette, cursive"
        fontSize={40}
        style={{
          userSelect: "none",
        }}
      />
    </div>
  );
};
