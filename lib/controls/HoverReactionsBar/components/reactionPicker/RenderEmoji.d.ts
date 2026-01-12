import * as React from 'react';
import { IEmojiInfo } from '../../models/IFluentEmoji';
export interface IRenderEmojiProps {
    emoji: IEmojiInfo;
    onSelect?: (emoji: string | undefined, emojiInfo?: IEmojiInfo) => void;
    className?: string;
}
export declare const RenderEmoji: React.FunctionComponent<IRenderEmojiProps>;
//# sourceMappingURL=RenderEmoji.d.ts.map