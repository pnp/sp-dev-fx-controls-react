import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useRenderHeaderStyles = makeStyles({
  closeButton: {
    marginLeft: "auto",
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 99999,
  },

  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke1,
    marginTop: "20px",

  },

  renderHeaderContent: {


    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",

    width: "100%",
  },
  renderHeaderHeader: {
    minHeight: "50px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    ...shorthands.gap("20px"),

  },
  renderHeaderFooter: {

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    ...shorthands.padding("20px"),
    ...shorthands.gap("20px"),
  },
  renderHeaderBody: {

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("20px"),
    ...shorthands.gap("20px"),
  },
  renderHeaderTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    ...shorthands.gap("0px"),
  },
  renderHeaderTitle: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    ...shorthands.overflow("hidden"),
    textAlign: "start",
    textOverflow: "ellipsis",
   
  },
  renderHeaderDescription: {
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    ...shorthands.overflow("hidden"),
    textAlign: "start",
    textOverflow: "ellipsis",
  },
  dialogTitleAndDescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    paddingLeft: "10px",
    paddingRight: "20px",
  },

});

