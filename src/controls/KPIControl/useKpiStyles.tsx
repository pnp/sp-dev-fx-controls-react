import { css, keyframes } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

// Animations for NoKpisCard
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;



const shimmerAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

interface IKpiStyles {
  iconContainer: string | undefined;
  card: string;
  description: string;
  footerMetric: string;
  footerIcon: string;
  footerLabel: string;
  footerValue: string;
  glowBlob: string;
  glowBlobSuccess: string;
  glowBlobError: string;
  headerActionBadge: string;
  kpiContainer: string;
  noKpiCard: string;
  // NoKpisCard styles
  noKpiCardContainer: string;
  noKpiBackgroundOrb1: string;
  noKpiBackgroundOrb2: string;
  noKpiIconContainer: string;
  noKpiIcon: string;
  noKpiSparkle1: string;
  noKpiSparkle2: string;
  noKpiTitle: string;
  noKpiSubtitle: string;
  noKpiHighlight: string;
  noKpiButtonContainer: string;
  noKpiButton: string;
  noKpiDecorativeLine: string;
}

export const useKpiStyles = (): IKpiStyles => {
  const styles = {
    card: css({
      width: "100%",
      borderRadius: 10,
      background: tokens.colorNeutralBackground1,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      boxShadow: tokens.shadow8,
      overflow: "hidden",
      position: "relative",
      padding: "0px 15px !important",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: tokens.shadow16, // deeper on hover
      },
    }),
    description: css({
      fontSize: tokens.fontSizeBase300,
      color: tokens.colorNeutralForeground4,
      lineHeight: tokens.lineHeightBase400,
      position: "relative",
      zIndex: 1,
    }),
    footerMetric: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: tokens.spacingVerticalXXS,
    }),
    footerIcon: css({
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase300,
    }),
    footerLabel: css({
      fontSize: tokens.fontSizeBase100,
      color: tokens.colorNeutralForeground3,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      fontWeight: tokens.fontWeightMedium,
    }),
    footerValue: css({
      fontSize: tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground2,
    }),
    glowBlob: css({
      position: "absolute",
      top: "-60px",
      right: "-60px",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      filter: "blur(40px)",
    }),
    glowBlobSuccess: css({
      position: "absolute",
      top: "-40px",
      right: "-40px",
      width: "160px",
      height: "160px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      background: `radial-gradient(circle, ${tokens.colorPaletteLightGreenBackground2} 0%, transparent 70%)`,
      opacity: 0.7,
      filter: "blur(20px)",
    }),
    glowBlobError: css({
      position: "absolute",
      top: "-40px",
      right: "-40px",
      width: "160px",
      height: "160px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      background: `radial-gradient(circle, ${tokens.colorPaletteRedBackground2} 0%, transparent 70%)`,
      opacity: 0.6,
      filter: "blur(20px)",
    }),
    headerActionBadge: css({
      minWidth: "32px",
      height: "32px",
      borderRadius: "50% !important",
      background: `${tokens.colorNeutralBackground3} !important`, // subtle circle bg
      border: "none !important",
      padding: "0 !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    kpiContainer: css({
      width: "100%",
      backgroundColor: tokens.colorNeutralBackground2,
      borderRadius: 8,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
      gap: 16,
      padding: 16,

    }),
    iconContainer: css({
      width: 48,
      height: 48,
      borderRadius: 8,
      display: "grid",
      placeItems: "center",
      background: tokens.colorNeutralBackgroundInverted,
    }),
    noKpiCard: css({
      width: 280,
      minHeight: 160,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    // NoKpisCard styles
    noKpiCardContainer: css({
      width: "100%",
      minWidth: "280px",
      minHeight: "280px",
      borderRadius: "16px",
      background: `linear-gradient(135deg, ${tokens.colorNeutralBackground1} 0%, ${tokens.colorNeutralBackground3} 100%)`,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      boxShadow: tokens.shadow16,
      overflow: "hidden",
      position: "relative",
      padding: "32px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: tokens.shadow28,
      },
    }),
    noKpiBackgroundOrb1: css({
      position: "absolute",
      top: "0px",
      right: "0px",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${tokens.colorBrandBackground2} 0%, transparent 70%)`,
      opacity: 0.8,
      pointerEvents: "none",
      filter: "blur(25px)",
      transform: "translate(30%, -30%)",
    }),
    noKpiBackgroundOrb2: css({
      position: "absolute",
      bottom: "-30px",
      left: "-30px",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${tokens.colorPaletteLavenderBackground2} 0%, transparent 70%)`,
      opacity: 0.5,
      pointerEvents: "none",
      filter: "blur(20px)",
    }),
    noKpiIconContainer: css({
      width: "80px",
      height: "80px",
      borderRadius: "20px",
      background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackground2} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 8px 24px ${tokens.colorBrandBackground}40`,
      animation: `${floatAnimation} 3s ease-in-out infinite`,
      position: "relative",
      zIndex: 1,
    }),
    noKpiIcon: css({
      fontSize: "36px",
      color: tokens.colorNeutralForegroundOnBrand,
    }),
    noKpiSparkle1: css({
      position: "absolute",
      top: "-8px",
      right: "-8px",
      color: tokens.colorPaletteYellowForeground1,
      fontSize: "20px",
      animation: `${floatAnimation} 2s ease-in-out infinite 0.5s`,
    }),
    noKpiSparkle2: css({
      position: "absolute",
      bottom: "-4px",
      left: "-8px",
      color: tokens.colorPaletteLavenderForeground2,
      fontSize: "16px",
      animation: `${floatAnimation} 2.5s ease-in-out infinite`,
    }),
    noKpiTitle: css({
      fontSize: "22px",
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground1,
      marginTop: "24px",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    }),
    noKpiSubtitle: css({
      fontSize: "14px",
      color: tokens.colorNeutralForeground3,
      textAlign: "center",
      lineHeight: "1.6",
      maxWidth: "320px",
      marginTop: "8px",
      position: "relative",
      zIndex: 1,
    }),
    noKpiHighlight: css({
      background: `linear-gradient(90deg, ${tokens.colorBrandForeground1}, ${tokens.colorPaletteLavenderForeground2}, ${tokens.colorBrandForeground1})`,
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontWeight: tokens.fontWeightSemibold,
      animation: `${shimmerAnimation} 3s linear infinite`,
    }),
    noKpiButtonContainer: css({
      marginTop: "24px",
      position: "relative",
      zIndex: 1,
    }),
    noKpiButton: css({
      borderRadius: "10px",
      padding: "10px 20px",
      fontWeight: tokens.fontWeightSemibold,
      transition: "transform 0.2s ease",
      "&:hover": {
        transform: "scale(1.02)",
      },
    }),
    noKpiDecorativeLine: css({
      width: "60px",
      height: "4px",
      borderRadius: "2px",
      background: `linear-gradient(90deg, ${tokens.colorBrandBackground}, ${tokens.colorPaletteLavenderBackground2})`,
      marginTop: "16px",
      position: "relative",
      zIndex: 1,
    }),
  };
  return styles;
};
