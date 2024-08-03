import React from "react";
import "./shimmer.scss";

type ShimmerProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
};

export const Shimmer: React.FC<ShimmerProps> = ({
  width = "150px",
  height = "25px",
  borderRadius = "4px",
  style,
}) => {
  return (
    <div className="shimmer-wrapper" style={{ width, height, ...style }}>
      <div className="shimmer-container">
        <div
          className="shimmer"
          style={{
            borderRadius,
          }}
        />
      </div>
    </div>
  );
};
