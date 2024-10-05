import { IMessageBarProps } from "@fluentui/react/lib/MessageBar";

export interface IShowMessageProps extends IMessageBarProps {
    isShow:boolean;
    message:JSX.Element | string;
}
