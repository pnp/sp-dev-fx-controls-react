
import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useRenderLabelStyles = makeStyles({

  labelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    ...shorthands.gap("6px"),
  },
  iconStyles: {
    width: "26px",
  },
  item: {
    paddingLeft: "15px",
  },


});
