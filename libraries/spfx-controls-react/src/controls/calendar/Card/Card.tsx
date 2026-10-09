
import * as React from 'react';

import {
  Card as CarFUI,
  CardFooter,
  CardHeader,
  CardPreview,
  mergeClasses,
} from '@fluentui/react-components';

import { ICardProps } from './ICardProps';
import { ResizeObserver } from '@juggle/resize-observer';
import { useCardStyles } from './useCardStyles';

export const Card = (props: React.PropsWithChildren<ICardProps>): JSX.Element => {
  const {
    className,
    cardBody,
    cardBodyClassName,
    cardHeader,
    cardHeaderClassName,
    cardHeaderImage,
    cardHeaderAction,
    cardHeaderDescription,
    cardFooterAction,
    cardFooterClassName,
    cardFooterContent,
    cardPreviewImage,
    cardPreviewLogo,
    cardPreviewPosition = "top",
  } = props;
  const { cardStyles, bodyCardDefaultStyles } = useCardStyles(props);
  const ref = React.useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    let resizeObserver: ResizeObserver;
    if (ref.current) {
      // observer to detect changes in the size of the container
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setWidth(width);
          setHeight(height);
        }
      });
      resizeObserver.observe(ref.current);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);
  return (
    <>
      <div ref={ref}>
        <CarFUI className={className} style={cardStyles(width, height)} {...props}>
          {cardPreviewImage && cardPreviewPosition === "top" && (
            <CardPreview logo={cardPreviewLogo}>{cardPreviewImage} </CardPreview>
          )}
          {cardHeader && (
            <CardHeader
              className={cardHeaderClassName}
              image={cardHeaderImage}
              header={cardHeader}
              description={cardHeaderDescription}
              action={cardHeaderAction}
            />
          )}
          {cardPreviewImage && cardPreviewPosition === "afterHeader" && (
            <CardPreview logo={cardPreviewLogo}>{cardPreviewImage} </CardPreview>
          )}
          {cardBody && (
            <div className={mergeClasses(cardBodyClassName)} style={bodyCardDefaultStyles}>
              {cardBody}
            </div>
          )}
          {cardPreviewImage && cardPreviewPosition === "bottom" && (
            <CardPreview logo={cardPreviewLogo}>{cardPreviewImage} </CardPreview>
          )}
          {cardFooterContent && (
            <CardFooter action={cardFooterAction} className={cardFooterClassName}>
              {cardFooterContent}
            </CardFooter>
          )}
        </CarFUI>
      </div>
    </>
  );
};
