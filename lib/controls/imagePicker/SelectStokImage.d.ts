import * as React from "react";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseComponentContext } from "@microsoft/sp-component-base";
export interface ISelectStockImageProps {
    onFileSelected: (file: any) => void;
    onCancel: () => void;
    context: ApplicationCustomizerContext | BaseComponentContext | undefined;
}
/**
 * Renders a component that allows the user to select a stock image.
 *
 * @component
 * @example
 * ```tsx
 * <SelectStockImage
 *   context={context}
 *   onFileSelected={handleFileSelected}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export declare const SelectStockImage: React.FunctionComponent<ISelectStockImageProps>;
//# sourceMappingURL=SelectStokImage.d.ts.map