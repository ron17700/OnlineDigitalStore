import "./navbar.scss";
import { OceanLogo } from "../OceanLogo/OceanLogo";
import { NavbarButton } from "./NavbarButton/NavbarButton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { colors } from "../../styles/colors";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-content-container">
        <OceanLogo />
        <div>
          <NavbarButton
            icon={
              <ShoppingCartIcon
                height="20px"
                width="20px"
                color={colors.gray01}
              />
            }
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
