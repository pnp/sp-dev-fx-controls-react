import * as React from 'react';

import {
  Button,
  FluentProvider,
  makeStyles,
  shorthands,
  Theme,
  Title3,
} from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { Icon } from '@iconify/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { HoverReactionsBar } from '../../../controls/HoverReactionsBar';
import {
  RenderEmoji,
} from '../../../controls/HoverReactionsBar/components/reactionPicker/RenderEmoji';
import {
  IEmojiInfo,
} from '../../../controls/HoverReactionsBar/models/IFluentEmoji';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.gap("10px"),
    marginLeft: "50%",
    marginRight: "50%",
    height: "fit-content",
    width: "fit-content",
  },
  image: {
    width: "20px",
    height: "20px",
  },
  title: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { themeVariant, context } = props;
  const [isOpenHoverReactionBar, setIsOpenHoverReactionBar] = React.useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = React.useState<IEmojiInfo>();
  const divRefAddReaction = React.useRef<HTMLDivElement>(null);
  const styles = useStyles();

  const setTheme = React.useCallback((): Partial<Theme> => {
    return createV9Theme(themeVariant);
  }, [themeVariant]);

  const onSelectEmoji = React.useCallback(async (emoji: string, emojiInfo: IEmojiInfo) => {
    setSelectedEmoji(emojiInfo);
    setIsOpenHoverReactionBar(false);
  }, []);
  return (
    <>
      <FluentProvider theme={setTheme()}>
        <div className={styles.title}>
          <Title3>Test Control - HoverReactionsBar</Title3>
        </div>

        <div ref={divRefAddReaction} className={styles.root}>
          <Button
            appearance="transparent"
            icon={
              <Icon
                icon="fluent-emoji-high-contrast:thumbs-up"
                width={22}
                height={22}
                onClick={(ev) => {
                  setIsOpenHoverReactionBar(true);
                }}
              />
            }
          />
          {selectedEmoji && <RenderEmoji emoji={selectedEmoji} className={styles.image} />}
        </div>
          <HoverReactionsBar
            isOpen={isOpenHoverReactionBar}
            onSelect={onSelectEmoji}
            onDismiss={(): void => {
              setIsOpenHoverReactionBar(false);
            }}
            target={divRefAddReaction.current as HTMLDivElement}
          />

      </FluentProvider>
    </>
  );
};
