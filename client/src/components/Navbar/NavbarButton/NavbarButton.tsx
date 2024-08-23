import "./navbar-button.scss";

interface NavbarButtonProps {
  icon: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  onClick,
  style,
}) => {
  return (
    <button className="navbar-button-container" onClick={onClick} style={style}>
      {icon}
    </button>
  );
};
