import * as React from "react";
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from "./Pagination.module.scss";
import isEqual from "lodash/isEqual";
import * as telemetry from '../../common/telemetry';
import { Stack } from "@fluentui/react/lib/Stack";

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

export class Pagination extends React.Component<IPaginationProps, IPaginationState> {
  constructor(props: Readonly<IPaginationProps>) {
    super(props);

    telemetry.track('ReactPagination');

    const paginationElements = this.preparePaginationElements(props.totalPages);

    this.state = {
      currentPage: props.currentPage,
      paginationElements,
      limiter: props.limiter ? props.limiter : 3,
    };
  }

  public componentDidUpdate(prevProps: IPaginationProps): void {
    let { currentPage, paginationElements } = this.state;

    if (prevProps.totalPages !== this.props.totalPages) {
      paginationElements = this.preparePaginationElements(this.props.totalPages);
      currentPage = this.state.currentPage > this.props.totalPages ? this.props.totalPages : this.state.currentPage;
    }
    if (this.props.currentPage !== prevProps.currentPage) {
      currentPage = this.props.currentPage > this.props.totalPages ? this.props.totalPages : this.props.currentPage;
    }

    if (!isEqual(this.state.currentPage, currentPage) || !isEqual(this.state.paginationElements, paginationElements)) {
      this.setState({
        paginationElements,
        currentPage
      });
    }
  }

  public render(): React.ReactElement<IPaginationProps> {
    return (
      <div className={`${styles.pagination} pagination-container`}>
        <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 1 }} wrap>
          {!this.props.hideFirstPageJump &&
            <DefaultButton
              className={`${styles.buttonStyle} pagination-button pagination-button_first`}
              onClick={() => this.onClick(1)}
              iconProps={{ iconName: "DoubleChevronLeft" }} />
          }

          {this.state.paginationElements.map((pageNumber) => this.renderPageNumber(pageNumber))}

          {!this.props.hideLastPageJump &&
            <DefaultButton
              className={`${styles.buttonStyle} pagination-button pagination-button_last`}
              onClick={() => this.onClick(this.props.totalPages)}
              iconProps={{ iconName: "DoubleChevronRight" }} />
          }
        </Stack>
      </div>
    );
  }

  private preparePaginationElements = (totalPages: number): number[] => {
    const paginationElementsArray: number[] = [];
    for (let i = 0; i < totalPages; i++) {
      paginationElementsArray.push(i + 1);
    }
    return paginationElementsArray;
  }

  private onClick = (page: number): void => {
    this.setState({ currentPage: page });
    this.props.onChange(page);
  }

  private renderPageNumber(pageNumber): JSX.Element {
    const {
      limiterIcon
    } = this.props;

    const {
      currentPage,
      limiter
    } = this.state;
    if (pageNumber === currentPage) {
      return (
        <PrimaryButton
          className={styles.buttonStyle}
          onClick={() => this.onClick(pageNumber)}
          text={pageNumber} />
      );
    } else {
      if (!(pageNumber < currentPage - limiter || pageNumber > currentPage + limiter)) {
        return (
          <DefaultButton
            className={styles.buttonStyle}
            onClick={() => this.onClick(pageNumber)}
            text={pageNumber} />);
      }
      else if (!(pageNumber < currentPage - limiter - 1 || pageNumber > currentPage + limiter + 1)) {
        if (limiterIcon) {
          return (<DefaultButton
            className={styles.buttonStyle}
            onClick={() => this.onClick(pageNumber)}
            iconProps={{ iconName: limiterIcon ? limiterIcon : "More" }} />);
        }
        else {
          return (<DefaultButton
            className={styles.buttonStyle}
            onClick={() => this.onClick(pageNumber)}
            iconProps={{ iconName: limiterIcon ? limiterIcon : "More" }} />);
        }
      }
      else {
        return;
      }
    }
  }
}
