import { ActionChange, ITermAction } from ".";


export const getTermActionChange = (tac: ActionChange[], termAction: ITermAction): { actionDisabled: boolean | null; actionHidden: boolean | null; } => {
  if (tac && tac.length > 0) {
    const changes = tac.filter((change: ActionChange) => change.actionId === termAction.id);
    if (changes && changes.length > 0) {
      return {
        actionDisabled: typeof changes[0].disabled !== "undefined" ? changes[0].disabled : null,
        actionHidden: typeof changes[0].hidden !== "undefined" ? changes[0].disabled : null
      };
    }
  }

  return {
    actionDisabled: null,
    actionHidden: null
  };
};
