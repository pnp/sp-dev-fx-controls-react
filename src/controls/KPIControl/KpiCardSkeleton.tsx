import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  tokens,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import * as React from "react";
import Stack from "./stack/Stack";
import { useKpiStyles } from "./useKpiStyles";
import { css } from "@emotion/css";

/**
 * Skeleton loading state for KPICard component.
 * Mimics the exact layout of KPICard while data is being fetched.
 */
export const KPICardSkeleton: React.FunctionComponent = () => {
  const styles = useKpiStyles();

  const skeletonStyles = {
    headerTitle: css({
      width: "120px",
      height: "16px",
    }),
    headerBadge: css({
      width: "32px",
      height: "32px",
      borderRadius: "50%",
    }),
    mainValue: css({
      width: "80px",
      height: "42px",
    }),
    goalText: css({
      width: "70px",
      height: "16px",
    }),
    progressLabel: css({
      width: "80px",
      height: "12px",
    }),
    progressValue: css({
      width: "50px",
      height: "12px",
    }),
    progressBar: css({
      width: "100%",
      height: "8px",
      borderRadius: "4px",
    }),
    footerIcon: css({
      width: "16px",
      height: "16px",
      borderRadius: "4px",
    }),
    footerLabel: css({
      width: "50px",
      height: "10px",
    }),
    footerValue: css({
      width: "40px",
      height: "14px",
    }),
    badge: css({
      width: "90px",
      height: "32px",
      borderRadius: "20px",
    }),
  };

  return (
    <Card className={styles.card}>
      <Skeleton animation="pulse">
        <Stack gap="m" padding="m">
          {/* Header */}
          <CardHeader
            header={
              <Stack direction="horizontal" alignItems="center" gap="8px">
                <SkeletonItem className={skeletonStyles.headerTitle} />
              </Stack>
            }
            action={
              <SkeletonItem
                className={skeletonStyles.headerBadge}
                shape="circle"
              />
            }
          />

          {/* Main Value and Goal */}
          <Stack
            gap="s"
            direction="horizontal"
            alignItems="baseline"
            paddingTop="s"
          >
            <SkeletonItem className={skeletonStyles.mainValue} />
            <SkeletonItem className={skeletonStyles.goalText} />
          </Stack>

          {/* Progress Section */}
          <Stack gap="s">
            <Stack direction="horizontal" justifyContent="space-between">
              <SkeletonItem className={skeletonStyles.progressLabel} />
              <SkeletonItem className={skeletonStyles.progressValue} />
            </Stack>
            <SkeletonItem className={skeletonStyles.progressBar} />
          </Stack>

          {/* Footer */}
          <CardFooter>
            {/* Goal */}
            <Stack direction="vertical" alignItems="center" gap="xs">
              <SkeletonItem className={skeletonStyles.footerIcon} />
              <SkeletonItem className={skeletonStyles.footerLabel} />
              <SkeletonItem className={skeletonStyles.footerValue} />
            </Stack>

            <Divider
              vertical
              style={{
                height: "32px",
                borderColor: tokens.colorNeutralStroke1,
              }}
            />

            {/* Total Items */}
            <Stack direction="vertical" alignItems="center" gap="xs">
              <SkeletonItem className={skeletonStyles.footerIcon} />
              <SkeletonItem className={skeletonStyles.footerLabel} />
              <SkeletonItem className={skeletonStyles.footerValue} />
            </Stack>

            <Divider
              vertical
              style={{
                height: "32px",
                borderColor: tokens.colorNeutralStroke1,
              }}
            />

            {/* % of Total */}
            <Stack direction="vertical" alignItems="center" gap="xs">
              <SkeletonItem className={skeletonStyles.footerIcon} />
              <SkeletonItem className={skeletonStyles.footerLabel} />
              <SkeletonItem className={skeletonStyles.footerValue} />
            </Stack>
          </CardFooter>

          {/* Status Badge */}
          <Stack>
            <SkeletonItem className={skeletonStyles.badge} />
          </Stack>
        </Stack>
      </Skeleton>
    </Card>
  );
};

export default KPICardSkeleton;
