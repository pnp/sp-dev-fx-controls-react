import { IEmojiInfo } from '../models/IFluentEmoji';
export interface IUseFluentEmojis {
    getEmojis: () => Promise<IEmojiInfo[]>;
    getFluentEmojis: () => any;
    getFluentEmojisByGroup: () => any;
    getFluentEmojiByglyph: (glyph: string) => any;
    getFluentEmojiByName: (name: string) => any;
    getFluentEmoji: (glyph: string) => any;
}
export declare const useFluentEmojis: () => IUseFluentEmojis;
//# sourceMappingURL=useFluentEmojis.d.ts.map