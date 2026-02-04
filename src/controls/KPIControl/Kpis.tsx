/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import { Stack } from './stack/Stack';
import { KPICard } from './KpiCard';
import { KPICardSkeleton } from './KpiCardSkeleton';
import { useKpiStyles } from './useKpiStyles';

import { NoKpisCard } from './NoKpisCard';
import { ShowError } from './showError';
import { IKpiCardData } from './IKpiCardData';
import { KPICardCompact } from './KpiCardCompact';

const mockData: IKpiCardData[] = [
  {
    identifier: 'kpi-1',
    title: 'Sales Revenue',
    currentValue: 125.0,
    goal: 150.0,
    totalItems: 200.0,
    description: 'This is a comprehensive description of the Total Sales Revenue KPI for Q1. This metric tracks all revenue generated from product sales, service contracts, and recurring subscriptions across all business units and geographic regions. The goal is set based on historical performance, market conditions, and strategic growth objectives. Performance is evaluated weekly with detailed breakdowns by product category, sales team, and customer segment. This KPI is critical for quarterly business reviews and investor reporting.',
    goalMetric: 2,
  },
  {
    identifier: 'kpi-2',
    title: 'Customer Satisfaction',
    currentValue: 87,
    goal: 90,
    totalItems: 100,
    description: 'Customer satisfaction score',
    goalMetric: 1,
  },
  {
    identifier: 'kpi-3',
    title: 'Tasks Completed',
    currentValue: 42,
    goal: 50,
    totalItems: 60,
    description: 'Number of tasks completed this month',
    goalMetric: 2,
  },
  {
    identifier: 'kpi-4',
    title: 'New Customers',
    currentValue: 156,
    goal: 200,
    totalItems: 250,
    description: 'New customer acquisitions this quarter',
    goalMetric: 1,
  },
  {
    identifier: 'kpi-5',
    title: 'Response Time',
    currentValue: 2.5,
    goal: 2,
    totalItems: 5,
    description: 'Average response time in hours',
    goalMetric: 2,
  },
  {
    identifier: 'kpi-6',
    title: 'Employee Engagement',
    currentValue: 78,
    goal: 85,
    totalItems: 100,
    description: 'Employee engagement score percentage',
    goalMetric: 1,
  },
];

export interface IKpisProps {
  skeletonCount?: number;
  compact?: boolean;
}

export const Kpis: React.FunctionComponent<IKpisProps> = (
  props: React.PropsWithChildren<IKpisProps>,
) => {
  const { skeletonCount = 3, compact = false } = props;
  const styles = useKpiStyles();
  const kpis = mockData;
  const loading = false;
  const error: string | null = null;

  /**
   * Renders skeleton cards while data is loading
   */
  const renderSkeletons = React.useCallback((): JSX.Element[] => {
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <KPICardSkeleton key={`kpi-skeleton-${index}`} />
    ));
  }, [skeletonCount]);

  return (
    <>
      <Stack gap="l" direction="horizontal" padding="l" paddingTop="s">
        <>
          {loading ? (
            renderSkeletons()
          ) : error ? (
            <ShowError message={error} />
          ) : (
            <div className={styles.kpiContainer}>
              {kpis.length > 0 ? (
                kpis.map((kpi) =>
                  compact ? (
                    <KPICardCompact key={kpi.identifier} dataCard={kpi} />
                  ) : (
                    <KPICard key={kpi.identifier} dataCard={kpi} />
                  ),
                )
              ) : (
                <NoKpisCard />
              )}
            </div>
          )}
        </>
      </Stack>
    </>
  );
};
