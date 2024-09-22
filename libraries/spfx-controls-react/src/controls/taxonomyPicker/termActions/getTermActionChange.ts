import { ActionChange, ITermAction } from "./ITermsActions";


export const getTermActionChange = (tac: ActionChange[], termAction: ITermAction): { actionDisabled: boolean | undefined; actionHidden: boolean | undefined; } => {
  if (tac && tac.length > 0) {
    const changes = tac.filter((change: ActionChange) => change.actionId === termAction.id);
    if (changes && changes.length > 0) {
      return {
        actionDisabled: typeof changes[0].disabled !== "undefined" ? changes[0].disabled : undefined,
        actionHidden: typeof changes[0].hidden !== "undefined" ? changes[0].disabled : undefined
      };
    }
  }

  return {
    actionDisabled: undefined,
    actionHidden: undefined
  };
};
