import * as React from 'react';

import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  Badge,
  Body1,
  Button,
  Divider,
  Subtitle1,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import { Card, RenderLabel, Stack } from '@nuvemerudita/react-controls';

import { IEvent } from './models/IEvents';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useUtils } from './hooks/useUtils';

export interface IEventDetailsPopoverProps {
  event: IEvent;
}

const PADDING_LEFT = '32px';

interface IUseStyles {
  styles: {
    banner: string;
    fieldContainer: string;
  };
}

const useStyles = (): IUseStyles => {
  const styles = {
    banner: css({
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: `5px 10px 0px 10px`,
    }),
    fieldContainer: css({
      paddingLeft:  PADDING_LEFT,
    }),
  };
  return { styles };
};

const RenderProperty: React.FC<{
  fieldLabel: string;
  fieldValue: string;
  icon: JSX.Element | string;
}> = ({ fieldLabel, fieldValue, icon }) => {
  return (
    <Stack>
      <RenderLabel label={fieldLabel} icon={icon} />
      <Stack paddingLeft={PADDING_LEFT}>
        <Body1>{fieldValue}</Body1>
      </Stack>
    </Stack>
  );
};

export const EventDetailsPopover: React.FunctionComponent<
  IEventDetailsPopoverProps
> = (props: React.PropsWithChildren<IEventDetailsPopoverProps>) => {
  const { event } = props;
  const { title, start, end, location, category, attendees, webLink } = event;
  const { styles } = useStyles();
  const { formatDate } = useUtils();
  const formatedStartDate = formatDate(start, 'PPp');
  const formatedEndDate = formatDate(end, 'PPp');

  const partitionedItems = partitionAvatarGroupItems({
    items: attendees?.map((attendee) => attendee.id) || [],
  });

  const getAttendee = React.useCallback(
    (id: string) => {
      return attendees?.find((attendee) => attendee.id === id) || undefined;
    },
    [attendees]
  );

  const RenderAttendees = React.useCallback((): JSX.Element => {
    return (
      <Stack>
        <RenderLabel label={strings.CalendarControlAttendeessLabel} icon={'ph:users-three'} />
        <Stack paddingLeft={PADDING_LEFT}>
          <AvatarGroup layout="stack">
            {partitionedItems.inlineItems.map((id) => (
              <AvatarGroupItem
                name={getAttendee(id)?.name}
                key={id}
                image={{ src: getAttendee(id)?.imageUrl }}
              />
            ))}
            {partitionedItems.overflowItems && (
              <AvatarGroupPopover>
                {partitionedItems.overflowItems.map((id) => (
                  <AvatarGroupItem
                    name={getAttendee(id)?.name}
                    key={id}
                    image={{ src: getAttendee(id)?.imageUrl }}
                  />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        </Stack>
      </Stack>
    );
  }, [partitionedItems]);

  return (
    <>
      <Card
        appearance="subtle"
        padding="m"
        paddingTop={'s'}
        width="250px"
        cardBody={
          <Stack RowGap={10}>
            <div className={styles.banner}>
              <Subtitle1>{title}</Subtitle1>
            </div>
            <Divider />
            {category && (
              <Stack horizontal horizontalAlign="end" width={'100%'}>
                <Badge appearance="filled">{category}</Badge>
              </Stack>
            )}
            <RenderProperty
              fieldLabel="Start"
              fieldValue={formatedStartDate}
              icon={'mingcute:time-line'}
            />
            <RenderProperty
              fieldLabel="End"
              fieldValue={formatedEndDate}
              icon={'mingcute:time-line'}
            />
            <RenderProperty
              fieldLabel="Location"
              fieldValue={location as string}
              icon={'mingcute:location-line'}
            />
            <RenderAttendees />
          </Stack>
        }
        cardFooterContent={
          <Stack horizontal horizontalAlign="end" width="100%">
            <Button
              appearance="subtle"
              onClick={() => {
                window.open(webLink, '_blank');
              }}
            >
             {strings.CalendarControlDetailsLabel}
            </Button>
          </Stack>
        }
      />
    </>
  );
};
