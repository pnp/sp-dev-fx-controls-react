
export enum EGoalMetric {
    "LOWER_IS_BETTER" = 1,
    "HIGHER_IS_BETTER" = 2
}
export interface IKpiCardData {

  identifier: string;
    /** Current numeric value of the KPI */
    currentValue: number;
    /** Goal / target threshold  */
    goal: number;
    /** Total number of items used to compute the KPI */
    totalItems: number;
    /** description */
    description: string;
    /** Card title */
    title?: string;
    // rule
    goalMetric ?: EGoalMetric;
}
