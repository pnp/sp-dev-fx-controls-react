/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { format, parseISO } from 'date-fns';

import { IEvent } from './models/IEvents';
import { css } from '@emotion/css';
import strings from 'ControlStrings';

export interface IEventDetailsPopoverProps {
  event: IEvent;
}

const useStyles = (_props?: IEvent) => {
  const styles = {
    banner: css({
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: `5px 10px 0px 10px`,
    }),
    fieldContainer: css({
      paddingLeft: 32,
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
      <Stack paddingLeft={'32px'}>
        <Body1>{fieldValue} </Body1>
      </Stack>
    </Stack>
  );
};

export const EventDetailsPopover: React.FunctionComponent<
  IEventDetailsPopoverProps
> = (props: React.PropsWithChildren<IEventDetailsPopoverProps>) => {
  const { event } = props;
  const { title, start, end, location, category, attendees } = event;

  const { styles } = useStyles(event);
  const formatedStartDate = format(parseISO(start), 'PPp');
  const formatedEndDate = format(parseISO(end), 'PPp');

  const partitionedItems = partitionAvatarGroupItems({
    items: attendees ? attendees?.map((attendee) => attendee.id) : [],
  });

  const hasAttendees = React.useMemo(() => {
    return attendees && attendees.length > 0;
  }, [attendees]);

  const getAttendeeName = React.useCallback(
    (id: string) => {
      return attendees?.find((attendee) => attendee.id === id)?.name || '';
    },
    [attendees]
  );

  const getAttendeeImage = React.useCallback(
    (id: string) => {
      return (
        attendees?.find((attendee) => attendee.id === id)?.imageUrl || undefined
      );
    },
    [attendees]
  );

  const RenderAttendees = React.useCallback((): JSX.Element => {
    return (
      <Stack RowGap={10} >
        <RenderLabel label={'Attendees'} icon={'ph:users-three'} />
        <Stack paddingLeft={'32px'}>
          <AvatarGroup layout="stack" size={28 }>
            {partitionedItems.inlineItems.map((id) => (
              <AvatarGroupItem
                name={getAttendeeName(id)}
                key={id}
                image={{ src: getAttendeeImage(id) }}
              />
            ))}
            {partitionedItems.overflowItems && (
              <AvatarGroupPopover>
                {partitionedItems.overflowItems.map((id) => (
                  <AvatarGroupItem
                    name={getAttendeeName(id)}
                    key={id}
                    image={{ src: getAttendeeImage(id) }}
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
        paddingBottom={'xl'}
        width="250px"
        cardBody={
          <Stack RowGap={10}>
            <div className={styles.banner}>
              <Subtitle1>{title}</Subtitle1>
            </div>
            <Divider />
            <Stack horizontal horizontalAlign="end" width={'100%'}>
              <Badge appearance="filled">{category}</Badge>
            </Stack>
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
            {hasAttendees &&  <RenderAttendees />}

          </Stack>
        }
        cardFooterContent={
          // display obnlye if eventLinkUrl is present
          event.eventLinkUrl && (
            <Stack horizontal horizontalAlign="end" width="100%">
              <Button
                appearance="subtle"
                onClick={() => {
                  if (event.eventLinkUrl) {
                    window.open(event.eventLinkUrl, '_blank');
                  }
                }}
              >
                {strings.CalendarControlEventDetailsLabel}
              </Button>
            </Stack>
          )
        }
      />
    </>
  );
};
