import { ITerm } from "../../../services/ISPTermStorePickerService";
import SPTermStorePickerService from "../../../services/SPTermStorePickerService";

import { ITermAction, UpdateAction, UpdateType } from ".";
import { findIndex } from "@microsoft/sp-lodash-subset";

/**
 * TermAction is responsible to obtain different labels for the term.
 */
export class TermLabelAction implements ITermAction {
  public id: string = "TermLabelActionId";

  private _labels: string[];
  private _processedTerms: ITerm[];

  constructor(public title: string, public iconName: string = "LocaleLanguage") {
    this._processedTerms = [];
  }

  public applyToTerm = (currentTerm: ITerm): boolean => {
    const termIndex = findIndex(this._processedTerms, term => term.Id === currentTerm.Id);
    if (termIndex >= 0) {
      return false;
    }
    return true;
  }

  public actionCallback = async (spTermService: SPTermStorePickerService, currentTerm: ITerm): Promise<UpdateAction> => {
    try {
      // Set pointer to loading
      let updateAction: UpdateAction = null;
      this._labels = await spTermService.getTermLabels(currentTerm.Id);

      if (this._labels) {
        const termLabel: string = this._labels.join(" ; ");
        updateAction = {
          updateActionType: UpdateType.updateTermLabel,
          value: termLabel
        };
        return updateAction;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
