import * as React from 'react';
import { IPagingProps, IPagingState } from '.';


// import styles from './Paging.module.scss';

export class Paging extends React.Component<IPagingProps, IPagingState> {
  public render(): React.ReactElement<IPagingProps> {
    const { showFooterNavigation, showArrowsNavigation } = this.props;
    return (
      <div>

        {

        }
      </div>
    );
  }

  private nextPage;
  private previousPage;

}
