import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useUserCardStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    ...shorthands.gap("20px"),
    ":hover": {
      cursor: "pointer",
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
root:{
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "fit-content",
  ...shorthands.gap("10px"),
  },
  personLine1Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    paddingBottom: "0px",
  },
  personLine1: {
    width: "100%",
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    paddingBottom: "0px",
    textAlign: "start",
  },
  personline1Styles: {
    paddingRight: "5px",
    color: tokens.colorNeutralForeground2
 },
});
