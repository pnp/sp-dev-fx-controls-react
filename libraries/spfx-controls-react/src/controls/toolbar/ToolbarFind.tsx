import * as React from "react";

import {
  Button,
  Input,
  Tooltip,
  tooltipAsLabelBehavior,
} from "@fluentui/react-northstar";
import { SearchIcon } from "@fluentui/react-icons-northstar";

import styles from "./Toolbar.module.scss";
import { TToolbarLayout } from "./ToolbarActionsUtils";

export interface IToolbarFindProps {
  layout: TToolbarLayout;
  findActive: boolean;
  setFindActive: React.Dispatch<React.SetStateAction<boolean>>;
  onFindQueryChange?: (findQuery: string) => string;
}

export const ToolbarFind = (props: IToolbarFindProps): JSX.Element => {
  switch (props.layout) {
    case "verbose":
      return (
        <Input
          clearable
          placeholder="Find"
          aria-label="Find"
          className="extended-toolbar__far-side__input"
          icon={<SearchIcon outline />}
          styles={{
            flexShrink: 1,
            width: "13.125rem",
          }}
          onChange={(e, inputProps) => {
            if (props.onFindQueryChange && inputProps)
              props.onFindQueryChange(inputProps.value);
          }}
        />
      );
    default:
    case "compact":
      return props.findActive ? (
        <>
          <Input
            autoFocus
            clearable
            placeholder="Find"
            aria-label="Find"
            className="extended-toolbar__far-side__input"
            icon={<SearchIcon outline />}
            styles={{
              flexShrink: 1,
              flexGrow: 1,
              width: "13.125rem",
            }}
            onChange={(e, inputProps) => {
              if (props.onFindQueryChange && inputProps)
                props.onFindQueryChange(inputProps.value);
            }}
          />
          <Button
            text
            title="Cancel"
            content="Cancel"
            className={"extended-toolbar__find-cancel " +  styles.toolbarButtonStyles}
            styles={{
              marginLeft: "1px",
              marginRight: "1px"
            }}
            onClick={(_e) => {
              if (props.onFindQueryChange) {
                props.onFindQueryChange("");
              }
              props.setFindActive(false);
            }}
          />
        </>
      ) : (
          <Tooltip
            trigger={
              <Button
                text
                title="Find"
                content=""
                className={"extended-toolbar__find-invoker " + styles.toolbarButtonStyles}
                icon={<SearchIcon outline />}
                styles={{
                  marginRight: ".5rem",
                  flex: "0 0 auto",
                }}
                onClick={(_e) => props.setFindActive(true)}
              />
            }
            content="Find"
            accessibility={tooltipAsLabelBehavior}
          />
        );
  }
};
