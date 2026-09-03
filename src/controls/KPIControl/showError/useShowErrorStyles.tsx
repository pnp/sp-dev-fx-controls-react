import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";
import { useMemo } from "react";

interface INewUseShowErrorStyles {
  container: string;
  icon: string;
  title: string;
  message: string;
}

export const useShowErrorStyles = (): INewUseShowErrorStyles => {
  return useMemo(
    () => ({
      container: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        textAlign: "center",
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusLarge,
        padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
        boxShadow: tokens.shadow4,
        maxWidth: "500px",
        margin: "20px auto",
      }),
      icon: css({
        fontSize: "48px",
        color: tokens.colorPaletteRedForeground1,
        animation: "pulse 2s infinite",
        "@keyframes pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      }),
      title: css({
        color: tokens.colorNeutralForeground1,
        fontWeight: tokens.fontWeightSemibold,
        textAlign: "center",
      }),
      message: css({
        color: tokens.colorNeutralForeground2,
        textAlign: "center",
        lineHeight: tokens.lineHeightBase400,
      }),
    }),
    []
  );
};
