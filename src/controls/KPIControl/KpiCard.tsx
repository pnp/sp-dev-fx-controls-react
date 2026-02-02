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

export const KPICard: React.FunctionComponent<IKpiCardProps> = (
  props: React.PropsWithChildren<IKpiCardProps>,
) => {
  const { dataCard } = props;
  const styles = useKpiStyles();



  const isGreen = React.useMemo(
    () =>
      dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
        ? dataCard.currentValue <= dataCard.goal
        : dataCard.currentValue >= dataCard.goal,
    [dataCard.currentValue, dataCard.goal],
  );
  const progressColor = React.useMemo(
    () => (isGreen ? 'success' : 'error'),
    [isGreen],
  );
  const goal = React.useMemo(
    () => dataCard.goal.toLocaleString(),
    [dataCard.goal],
  );
  const totalPercent = React.useMemo(
    () => (dataCard.currentValue / dataCard.totalItems) * 100,
    [dataCard.currentValue, dataCard.totalItems],
  );
  const isOnTrack = React.useMemo(
    () =>  dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
        ? dataCard.currentValue <= dataCard.goal
        : dataCard.currentValue >= dataCard.goal,
    [dataCard.currentValue, dataCard.goal],
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
      <Card className={styles.card}>
        {/* Glow blob effect - green for on track, red for exceeds goal */}
        <div
          className={isOnTrack ? styles.glowBlobSuccess : styles.glowBlobError}
        />
        <Stack gap="m" padding="m">
          <CardHeader
            header={
              <Stack direction="horizontal" alignItems="center" gap="8px">
                <InfoLabel
                  info={
                    <>
                      <Text size={300} color="neutralSecondary">
                        {dataCard.description ||
                          'No description provided for this KPI card.'}
                      </Text>
                    </>
                  }
                >
                  <Text  weight="bold" size={300}>
                    {dataCard.title?.toUpperCase() || 'KPI Card'}
                  </Text>
                </InfoLabel>
              </Stack>
            }
            action={
              <Tooltip
                content={
                  isOnTrack
                    ? '✓ Within goal threshold'
                    : '⚠ Exceeds goal threshold'
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
              / {dataCard.goal} Goal
            </Text  >
          </Stack>
          <Stack gap="s">
            <Stack direction="horizontal" justifyContent="space-between">
              <Text size={300} color="neutralSecondary">
                Progress Goal
              </Text>
              <Text
                size={300}
                color="neutralSecondary"
                weight="bold"
              >
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
              content="Maximum allowed threshold"
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
            <Tooltip content="Total items in scope" relationship="inaccessible">
              <Text className={styles.footerMetric}>
                <DocumentRegular className={styles.footerIcon} />
                <Text className={styles.footerLabel}>Total Items</Text>
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
              content="Current value as % of total items"
              relationship="inaccessible"
            >
              <Text className={styles.footerMetric}>
                <CalculatorRegular className={styles.footerIcon} />
                <Text className={styles.footerLabel}>% of Total</Text>
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
              {isOnTrack ? 'On Track' : 'Exceeds Goal'}
            </Badge>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
