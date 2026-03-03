import { Theme } from '@fluentui/react';
import { IEmojiInfo } from './models/IFluentEmoji';
export interface IHoverReactionsBarProps {
    onSelect: (emoji: string | undefined, emojiInfo?: IEmojiInfo) => void;
    isOpen: boolean;
    onDismiss: () => void;
    top4Reactions?: string[];
    target: HTMLDivElement;
    themeV8?: Theme;
}
//# sourceMappingURL=IHoverReactionsBarProps.d.ts.map