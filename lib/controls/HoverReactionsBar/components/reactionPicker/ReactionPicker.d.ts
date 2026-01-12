import * as React from 'react';
import { IEmojiInfo } from '../../models/IFluentEmoji';
export interface IReactionProps {
    onSelect: (emoji: string | undefined, emojiInfo?: IEmojiInfo) => void;
    isOpen: boolean;
    onDismiss: () => void;
    returnType?: 'emoji' | 'image';
    target?: HTMLDivElement;
}
export declare const ReactionPicker: React.FunctionComponent<IReactionProps>;
//# sourceMappingURL=ReactionPicker.d.ts.map