import "./ocean-input.scss";

type OceanInputProps = {
  value: string;
  onChange: (value: string) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  containerStyle?: React.CSSProperties;
  checked?: boolean;
};

export const OceanInput: React.FC<OceanInputProps> = ({
  value,
  onChange,
  leftIcon,
  rightIcon,
  placeholder,
  type,
  containerStyle,
  checked,
}) => {
  return (
    <div className="ocean-input-container" style={containerStyle}>
      <div className="left-icon-container">{leftIcon}</div>
      <div className="right-icon-container">{rightIcon}</div>
      <input
        checked={checked}
        type={type}
        className="ocean-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
