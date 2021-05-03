import { IMessageBarProps } from "office-ui-fabric-react/lib/MessageBar";

export interface IShowMessageProps extends IMessageBarProps {
    isShow:boolean;
    message:JSX.Element | string;
}
