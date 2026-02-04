import * as React from "react";
import { Card, Text, Button } from "@fluentui/react-components";
import {
  DataBarVerticalStarRegular,
  SettingsRegular,
  SparkleRegular,
} from "@fluentui/react-icons";
import Stack from "./stack/Stack";
import { useKpiStyles } from "./useKpiStyles";

// Mock data for the list URL
const mockListUrl = "/sites/mock-site/Lists/Directory Status Config";

/**
 * NoKpisCard Component

 */
export const NoKpisCard: React.FC = () => {
  const styles = useKpiStyles();
  const listUrl = mockListUrl;
  const isLoading = false;

  const onConfigure = React.useCallback((): void => {
    if (!listUrl) return;

    const host = window.location.origin;
    // listUrl is already the ServerRelativeUrl, just append AllItems.aspx
    const appConfigUrl = `${host}${listUrl}/AllItems.aspx`;
    window.open(appConfigUrl, "_blank");
  }, [listUrl]);

  return (
    <Card className={styles.noKpiCardContainer}>
      {/* Background decorative orbs */}
      <div className={styles.noKpiBackgroundOrb1} />
      <div className={styles.noKpiBackgroundOrb2} />

      <Stack alignItems="center" justifyContent="center" gap="s">
        {/* Icon with sparkles */}
        <div className={styles.noKpiIconContainer}>
          <DataBarVerticalStarRegular className={styles.noKpiIcon} />
          <SparkleRegular className={styles.noKpiSparkle1} />
          <SparkleRegular className={styles.noKpiSparkle2} />
        </div>

        {/* Title */}
        <Text className={styles.noKpiTitle}>No KPIs Configured</Text>

        {/* Decorative line */}
        <div className={styles.noKpiDecorativeLine} />

        {/* Subtitle */}
        <Text className={styles.noKpiSubtitle}>
          Start tracking your team&apos;s performance by configuring{" "}
          <span className={styles.noKpiHighlight}>KPI parameters</span> in the
          App Configuration list.
        </Text>

        {/* Action button - only show if list URL was fetched successfully */}
        {!isLoading && listUrl && (
          <div className={styles.noKpiButtonContainer}>
            <Button
              appearance="outline"
              icon={<SettingsRegular />}
              className={styles.noKpiButton}
              onClick={onConfigure}
            >
              Configure KPIs
            </Button>
          </div>
        )}
      </Stack>
    </Card>
  );
};

export default NoKpisCard;
