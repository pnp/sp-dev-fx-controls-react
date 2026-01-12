import * as React from "react";
export interface IPaginationProps {
    /**
     * The page initial selected
     */
    currentPage: number;
    /**
     * The total of page that you want to show on control
     */
    totalPages: number;
    /**
     * When the page number change send the page number selected
     */
    onChange: (page: number) => void;
    /**
     * The number of pages showing before the icon
     */
    limiter?: number;
    /**
     * Hide the quick jump to the first page
     */
    hideFirstPageJump?: boolean;
    /**
     * Hide the quick jump to the last page
     */
    hideLastPageJump?: boolean;
    /**
     * Limitir icon, by default is More icon
     */
    limiterIcon?: string;
}
export interface IPaginationState {
    currentPage: number;
    paginationElements: number[];
    limiter: number;
}
export declare class Pagination extends React.Component<IPaginationProps, IPaginationState> {
    constructor(props: Readonly<IPaginationProps>);
    componentDidUpdate(prevProps: IPaginationProps): void;
    render(): React.ReactElement<IPaginationProps>;
    private preparePaginationElements;
    private onClick;
    private renderPageNumber;
}
//# sourceMappingURL=Pagination.d.ts.map