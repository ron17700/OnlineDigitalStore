export const colors = {
  white: "#FFFFFF",
  black: "#000000",

  blue01: "#006BB6",
  blue02: "#0094DA",
  blue03: "#00A1E6",
  blue04: "#66C2FF",
  blue05: "#B3E5FC",

  yellow01: "#FFD600",
  yellow02: "#FFEB3B",
  yellow03: "#FFEE58",
  yellow04: "#FFEB3B",
  yellow05: "#FFF9C4",

  orange01: "#E64A19",
  orange02: "#FF5722",
  orange03: "#FF7043",
  orange04: "#FF7043",
  orange05: "#FFCCBC",

  gray01: "#0E0E0E",
  gray02: "#616161",
  gray03: "#BFBFBF",
  gray04: "#E4E4E5",
  gray05: "#F5F5F5",

  green01: "#388E3C",
  green02: "#4CAF50",
  green03: "#81C784",
  green04: "#4CAF50",
  green05: "#C8E6C9",

  red01: "#D32F2F",
  red02: "#F44336",
  red03: "#E57373",
  red04: "#F44336",
  red05: "#FFCDD2",
} as const;

export type Colors = (typeof colors)[keyof typeof colors];
