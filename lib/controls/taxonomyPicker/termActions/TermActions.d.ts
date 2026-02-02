import { ITerm } from "../../../services/ISPTermStorePickerService";
import SPTermStorePickerService from "../../../services/SPTermStorePickerService";
import { ITermAction, UpdateAction } from ".";
/**
 * TermAction is responsible to obtain different labels for the term.
 */
export declare class TermLabelAction implements ITermAction {
    title: string;
    iconName: string;
    id: string;
    private _labels;
    private _processedTerms;
    constructor(title: string, iconName?: string);
    applyToTerm: (currentTerm: ITerm) => boolean;
    actionCallback: (spTermService: SPTermStorePickerService, currentTerm: ITerm) => Promise<UpdateAction>;
}
//# sourceMappingURL=TermActions.d.ts.map