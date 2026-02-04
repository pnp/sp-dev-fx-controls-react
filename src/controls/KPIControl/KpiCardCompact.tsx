import {
  Card,
  CardHeader,
  ProgressBar,
  tokens,
  Tooltip,
  Text,
  Badge,
  InfoLabel,
} from '@fluentui/react-components';
import * as React from 'react';
import Stack from './stack/Stack';

import { useKpiStyles } from './useKpiStyles';
import {
  AlertFilled,
  CheckmarkCircleRegular,
} from '@fluentui/react-icons';
import { IKpiCardProps } from './IKpiCardProps';
import { EGoalMetric } from './IKpiCardData';
import strings from 'ControlStrings';

export const KPICardCompact: React.FunctionComponent<IKpiCardProps> = (
  props: React.PropsWithChildren<IKpiCardProps>,
) => {
  const { dataCard } = props;
  const styles = useKpiStyles();

  // State to control InfoLabel popover visibility
  const [isInfoLabelOpen, setIsInfoLabelOpen] = React.useState(false);

  // Handle card mouse leave to auto-dismiss InfoLabel
  const handleCardMouseLeave = React.useCallback(() => {
    setIsInfoLabelOpen(false);
  }, []);

  // Determine if KPI is on track based on goal metric type
  const isOnTrack = React.useMemo(
    () =>
      dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
        ? dataCard.currentValue <= dataCard.goal // Lower is better: on track when current <= goal
        : dataCard.currentValue >= dataCard.goal, // Higher is better: on track when current >= goal
    [dataCard.currentValue, dataCard.goal, dataCard.goalMetric],
  );

  const progressColor = React.useMemo(
    () => (isOnTrack ? 'success' : 'error'),
    [isOnTrack],
  );

  // Success / Danger foregrounds (icon + badge text + bar fill)
  const accentFg = React.useMemo(
    () =>
      isOnTrack
        ? tokens.colorPaletteLightGreenForeground2
        : tokens.colorPaletteRedForeground2,
    [isOnTrack],
  );

  // Success / Danger backgrounds (badge pill bg)

  // Success / Danger borders (badge pill border)


  return (
    <>
      <Card className={styles.card} style={{ height: '168px' }} onMouseLeave={handleCardMouseLeave}>
        {/* Glow blob effect - green for on track, red for exceeds goal */}
        <div
          className={isOnTrack ? styles.glowBlobSuccess : styles.glowBlobError}
        />
        <Stack gap="0px" padding="m">
          <CardHeader
            header={
              <Stack direction="vertical" gap="2px">
                <Stack direction="horizontal" alignItems="center" gap="8px">
                  <InfoLabel
                    infoButton={{
                      popover: {
                        open: isInfoLabelOpen,
                        onOpenChange: (_e, data) => setIsInfoLabelOpen(data.open),
                      },
                    }}
                    info={
                      <>
                        <Text size={300} color="neutralSecondary">
                          {dataCard.description || strings.KPINoDescription}
                        </Text>
                      </>
                    }
                  >
                    <Text weight="bold" size={300}>
                      {dataCard.title?.toUpperCase() || strings.KPIDEfaultTitle}
                    </Text>
                  </InfoLabel>
                </Stack>
                <Text
                  size={200}
                  style={{
                    color: tokens.colorNeutralForeground3,
                    fontStyle: 'italic',
                  }}
                >
                  {dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
                    ? strings.KPILowerIsBetter
                    : strings.KPIHigherIsBetter}
                </Text>
              </Stack>
            }
            action={
              <Tooltip
                content={
                  isOnTrack
                    ? `✓ ${strings.KPIWithinGoalThreshold}`
                    : `⚠ ${strings.KPIExceedsGoalTreshhold}`
                }
                relationship="inaccessible"
              >
                <Badge
                  className={styles.headerActionBadge}
                  appearance="ghost"
                  size="small"
                  icon={
                    isOnTrack ? (
                      <CheckmarkCircleRegular
                        style={{ color: accentFg, fontSize: '22px' }}
                      />
                    ) : (
                      <AlertFilled
                        style={{ color: accentFg, fontSize: '22px' }}
                      />
                    )
                  }
                />
              </Tooltip>
            }
          />
          <Stack gap="s" direction="horizontal" alignItems="baseline">
            <Text weight="bold" size={900}>
              {dataCard.currentValue} <br />
            </Text>
            <Text weight="semibold" size={300} color="neutralSecondary">
              / {dataCard.goal} {strings.KPIGoal}
            </Text>
          </Stack>
          <Stack gap="s">
            <Stack direction="horizontal" justifyContent="space-between">
              <Text size={300} color="neutralSecondary">
                {strings.KPIProgressGoal}
              </Text>
              <Text size={300} color="neutralSecondary" weight="bold">
                {((dataCard.currentValue / dataCard.goal) * 100).toFixed(2)}%
              </Text>
            </Stack>
            <ProgressBar
              value={dataCard.currentValue / dataCard.goal}
              color={progressColor}
              style={{ height: '3px' }}
              shape="rounded"
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
