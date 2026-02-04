import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
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
  CalculatorRegular,
  CheckmarkCircleRegular,
  DocumentRegular,
  TargetRegular,
} from '@fluentui/react-icons';
import { IKpiCardProps } from './IKpiCardProps';
import { EGoalMetric } from './IKpiCardData';
import strings from 'ControlStrings';

export const KPICard: React.FunctionComponent<IKpiCardProps> = (
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
        ? dataCard.currentValue <= dataCard.goal  // Lower is better: on track when current <= goal
        : dataCard.currentValue >= dataCard.goal, // Higher is better: on track when current >= goal
    [dataCard.currentValue, dataCard.goal, dataCard.goalMetric],
  );

  const progressColor = React.useMemo(
    () => (isOnTrack ? 'success' : 'error'),
    [isOnTrack],
  );
  const goal = React.useMemo(
    () => dataCard.goal.toLocaleString(),
    [dataCard.goal],
  );
  const totalPercent = React.useMemo(
    () => (dataCard.currentValue / dataCard.totalItems) * 100,
    [dataCard.currentValue, dataCard.totalItems],
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
  const accentBg = React.useMemo(
    () =>
      isOnTrack
        ? tokens.colorPaletteLightGreenBackground1
        : tokens.colorPaletteRedBackground1,
    [isOnTrack],
  );

  // Success / Danger borders (badge pill border)
  const accentBorder = React.useMemo(
    () =>
      isOnTrack
        ? tokens.colorPaletteLightGreenBorder1
        : tokens.colorPaletteRedBorder1,
    [isOnTrack],
  );

  const badgeStyle = React.useMemo<React.CSSProperties>(
    () => ({
      background: accentBg,
      border: `1px solid ${accentBorder}`,
      color: accentFg,
      borderRadius: '20px',
      padding: '12px 12px',
      fontSize: tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightSemibold,
      letterSpacing: '0.3px',
      maxWidth: 'fit-content',
    }),
    [accentBg, accentBorder, accentFg],
  );

  return (
    <>
      <Card className={styles.card} onMouseLeave={handleCardMouseLeave}>
        {/* Glow blob effect - green for on track, red for exceeds goal */}
        <div
          className={isOnTrack ? styles.glowBlobSuccess : styles.glowBlobError}
        />
        <Stack gap="m" padding="m">
          <CardHeader
            header={
              <Stack direction="vertical" gap="2px">
                <Stack direction="horizontal" alignItems="center" gap="8px">
                  <InfoLabel
                    style={{ zIndex: 99999 }}
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
          <Stack
            gap="s"
            direction="horizontal"
            alignItems="baseline"
            paddingTop="s"
          >
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
              style={{ height: '8px' }}
              shape="rounded"
            />
          </Stack>
          <CardFooter>
            <Tooltip
              content={strings.KPIMaxAllowedThreshold}
              relationship="inaccessible"
            >
              <Text className={styles.footerMetric}>
                <TargetRegular className={styles.footerIcon} />
                <Text className={styles.footerLabel}>Goal</Text>
                <Text className={styles.footerValue}>{goal}</Text>
              </Text>
            </Tooltip>

            <Divider
              vertical
              style={{
                height: '32px',
                borderColor: tokens.colorNeutralStroke1, // token border
              }}
            />

            {/* Total Items */}
            <Tooltip
              content={strings.KPITotalItemsInScope}
              relationship="inaccessible"
            >
              <Text className={styles.footerMetric}>
                <DocumentRegular className={styles.footerIcon} />
                <Text className={styles.footerLabel}>
                  {strings.KPITotalItems}
                </Text>
                <Text className={styles.footerValue}>
                  {dataCard.totalItems.toLocaleString()}
                </Text>
              </Text>
            </Tooltip>

            <Divider
              vertical
              style={{
                height: '32px',
                borderColor: tokens.colorNeutralStroke1,
              }}
            />

            {/* % of Total */}
            <Tooltip
              content={strings.KPICurrentValueAsPercent}
              relationship="inaccessible"
            >
              <Text className={styles.footerMetric}>
                <CalculatorRegular className={styles.footerIcon} />
                <Text className={styles.footerLabel}>{strings.KPIPercentOfTotal}</Text>
                <Text className={styles.footerValue}>
                  {totalPercent.toFixed(2)}%
                </Text>
              </Text>
            </Tooltip>
          </CardFooter>
          <Stack>
            <Badge
              appearance="outline"
              size="small"
              style={badgeStyle}
              icon={
                isOnTrack ? (
                  <CheckmarkCircleRegular style={{ fontSize: '14px' }} />
                ) : (
                  <AlertFilled style={{ fontSize: '14px' }} />
                )
              }
            >
              {isOnTrack ? strings.KPIOnTrack : strings.KPIExceedGoal}
            </Badge>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
