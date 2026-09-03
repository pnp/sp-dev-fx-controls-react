import { CardProps } from '@fluentui/react-components';

import { IBaseProps } from '../baseComponentProps/IBaseProps';

export interface ICardProps extends IBaseProps, CardProps {
    cardHeaderClassName?: string;
    cardHeader?: string | JSX.Element;
    cardHeaderImage?: string | JSX.Element;
    
    cardHeaderDescription?: string | JSX.Element;
    cardHeaderAction?: JSX.Element;
    cardPreviewLogo?:   JSX.Element;
    cardPreviewImage?:   JSX.Element;
    cardPreviewPosition?: "top" | "afterHeader" | "bottom";
    cardBody?: string | JSX.Element;
    cardBodyClassName?: string;
  
    cardFooterClassName?: string;
    cardFooterAction?: JSX.Element;
    cardFooterContent?: JSX.Element;
    
}
       