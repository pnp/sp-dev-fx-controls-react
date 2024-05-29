import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useUserPickerStyles = makeStyles({
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
  image: {
    width: "32px",
  },
  imageButton: {
    width: "28px",
  },
  userItem: {
    ...shorthands.padding("3px"),
    minWidth: "200px",
    maxWidth: "fit-content",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shorthands.gap("20px"),
    backgroundColor: tokens.colorNeutralBackground3,
    /*   ...shorthands.padding("3px"), */
    ...shorthands.border("1px solid", tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.overflow("hidden"),
  },
  userItemCloseButton: {
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Selected,
      cursor: "pointer",
    },
  },
  selectUserMainContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  selectedUserContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    ...shorthands.padding("2px"),
    columnGap: "2px",
    rowGap: "5px",
    marginTop: "3px",
    marginBottom: "3px",
  },
  inputContainer: {
    width: "inherit",
  },
  userCardStyles: {
    ...shorthands.padding("5px"),
  },
  popupContainer: {
    position: "fixed",
    zIndex: 99999,
    minWidth: "250px",
    ...shorthands.padding("10px"),
    ...shorthands.gap("5px"),
  },
  usersContainer: {
    overflowY: "auto",
    overflowX: "hidden",
    "scrollbar-color": tokens.colorNeutralBackground1,
    "scrollbar-width": "thin",
    "::-webkit-scrollbar-thumb": {
      backgroundColor: tokens?.colorBrandStroke2,
      ...shorthands.borderRadius("10px"),
      ...shorthands.borderWidth("1px"),
    },
    "::-webkit-scrollbar": {
      height: "10px",
      width: "7px",
    },
    width: "100%",
    maxHeight: "450px",
  },
});
