import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useHoverReactionsStyles = makeStyles({
  emojiList: {
   display: "flex",
   flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
   height: "30px",
   ...shorthands.gap("10px"),
    width: "100%",
  },
  card: {
    position:"absolute",
    ...shorthands.borderRadius("4px"),
    width: "160px",

    ...shorthands.padding("5px"),
  },
  cardContent: {
    display: "flex",
    width: "100%",
    ...shorthands.flex("1"),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    ...shorthands.gap("10px"),
  },
  searchBox: {
    width: "100%",
  },
  emojiRoot: {

  /*   ...shorthands.margin("10px"), */
    cursor: "pointer",
  },
  emoji: {
    fontSize: "30px",

  },
  emojiImage: {
    with: "20px",
    height: "20px",
    cursor: "pointer",
    '&:hover': {
      transform: "scale(1.2)",
     with: "25px",
      height: "25px",
    },
  }
});
