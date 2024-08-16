import "./navbar-button.scss";

interface NavbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button className="navbar-button-container" onClick={onClick}>
      {icon}
    </button>
  );
};
