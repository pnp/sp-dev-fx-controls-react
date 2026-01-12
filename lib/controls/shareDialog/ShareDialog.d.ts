import * as React from 'react';
interface IDialogOptions {
    siteUrl: string;
    listId: string;
    itemId: string | number;
    name: string;
}
interface ShareDialogProps {
    isOpen: boolean;
    options: IDialogOptions;
    onClose: () => void;
}
export declare const ShareDialog: React.FC<ShareDialogProps>;
export {};
//# sourceMappingURL=ShareDialog.d.ts.map