import "./ocean-input.scss";

type OceanInputProps = {
  value: string;
  onChange: (value: string) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  placeholder?: string;
};

export const OceanInput: React.FC<OceanInputProps> = ({
  value,
  onChange,
  leftIcon,
  rightIcon,
  placeholder,
}) => {
  return (
    <div className="ocean-input-container">
      <div className="left-icon-container">{leftIcon}</div>
      <div className="right-icon-container">{rightIcon}</div>
      <input
        className="ocean-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
