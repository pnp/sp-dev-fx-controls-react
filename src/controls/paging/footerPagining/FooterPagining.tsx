import * as React from 'react';
// import styles from './FooterPagining.module.scss';

export interface IFooterPaginingProps {
  selectedIndex: number;
  onPageSelect: (index: number) => void;
}

export interface IFooterPaginingState {}

export class FooterPagining extends React.Component<IFooterPaginingProps, IFooterPaginingState> {
  public render(): React.ReactElement<IFooterPaginingProps> {
    return (
      <div>

      </div>
    );
  }
}
