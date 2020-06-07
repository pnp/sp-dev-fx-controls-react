import * as React from 'react';
import styles from './CarouselImage.module.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

export interface ICarouselImageProps {
  imageSrc: string;
  imageFit?: ImageFit;
  url?: string;
  title?: string;
  description?: string | JSX.Element;
  target?: '_blank' | '_self';
  showDetailsOnHover?: boolean;
  detailsBackgroundColor?: string;
  detailsColor?: string;
  className?: string;
  style?: React.CSSProperties;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  detailsClassName?: string;
  detailsStyle?: React.CSSProperties;
}

export interface ICarouselImageState { }

export default class CarouselImage extends React.Component<ICarouselImageProps, ICarouselImageState> {
  public render(): React.ReactElement<ICarouselImageProps> {
    const {
      imageSrc,
      imageFit = ImageFit.none,
      url,
      title,
      description,
      target = '_blank',
      showDetailsOnHover,
      detailsBackgroundColor,
      detailsColor,
      className,
      style,
      imgClassName,
      imgStyle,
      detailsClassName,
      detailsStyle
    } = this.props;

    let details: JSX.Element | null = null;
    const hasDetails = !!title || !!description;

    if (hasDetails) {
      let descriptionEl: JSX.Element | null;
      if (description) {
        if (typeof(description) === 'string') {
          descriptionEl = <span>{description}</span>;
        }
        else {
          descriptionEl = description;
        }
      }
      const detailsContent = <div className={styles.details}>
        {!!title && <span>{title}</span>}
        {descriptionEl}
      </div>;

      if (url) {
        details = <a href={url} target={target}>{detailsContent}</a>;
      }
      else {
        details = detailsContent;
      }
    }

    return (
      <div className={styles.carouselImage}>
        <Image className={styles.image} imageFit={imageFit} src={imageSrc} />
        {details}
      </div>
    );
  }
}
