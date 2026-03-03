export interface IFluentEmoji {
    [key: string]: IEmojiInfo;
}
export interface IEmojiInfo {
    cldr: string;
    fromVersion: string;
    glyph: string;
    glyphAsUtfInEmoticons: string[];
    group: string;
    keywords: string[];
    mappedToEmoticons: string[];
    tts: string;
    unicode: string;
    sortOrder: number;
    isSkintoneBased: boolean;
    styles: Styles;
    skintones: Skintones;
}
interface Styles {
    '3D': string;
    Color: string;
    Flat: string;
    HighContrast: string;
}
export interface Skintones {
    Dark: Styles;
    Default: Styles;
    Light: Styles;
    Medium: Styles;
    MediumDark: Styles;
    MediumLight: Styles;
}
export {};
//# sourceMappingURL=IFluentEmoji.d.ts.map