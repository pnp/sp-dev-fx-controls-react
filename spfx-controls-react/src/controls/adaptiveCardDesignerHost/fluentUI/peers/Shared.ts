import * as Adaptive from "adaptivecards";
import { PropertySheetContext, PropertySheetEntry } from "adaptivecards-designer/lib/designer-peers";

interface INameValuePair {
    name: string;
    value: string;
}

export class DesignerPeerCategory {
    public static Unknown = "Unknown";
    public static Containers = "Containers";
    public static Elements = "Elements";
    public static Inputs = "Inputs";
    public static Actions = "Actions";
}

export class NameValuePairPropertyEditor extends PropertySheetEntry {
    private collectionChanged(context: PropertySheetContext, nameValuePairs: INameValuePair[], refreshPropertySheet: boolean): void {
        context.target[this.collectionPropertyName] = [];

        for (const nameValuePair of nameValuePairs) {
            const item = this.createCollectionItem(nameValuePair.name, nameValuePair.value);

            context.target[this.collectionPropertyName].push(item);
        }

        context.peer.changed(refreshPropertySheet);
    }

    public render(context: PropertySheetContext): Adaptive.CardElement {
        const result = new Adaptive.Container();

        const collection = context.target[this.collectionPropertyName];

        if (!Array.isArray(collection)) {
            throw new Error("The " + this.collectionPropertyName + " property on " + context.peer.getCardObject().getJsonTypeName() + " either doesn't exist or isn't an array.");
        }

        const nameValuePairs: INameValuePair[] = [];

        for (const pair of collection) {
            nameValuePairs.push(
                {
                    name: pair[this.namePropertyName],
                    value: pair[this.valuePropertyName]
                }
            );
        }

        if (nameValuePairs.length === 0) {
            const messageTextBlock = new Adaptive.TextBlock();
            messageTextBlock.spacing = Adaptive.Spacing.Small;
            messageTextBlock.text = this.messageIfEmpty;

            result.addItem(messageTextBlock);
        }
        else {
            for (let i = 0; i < nameValuePairs.length; i++) {
                let textInput = new Adaptive.TextInput();
                textInput.placeholder = this.namePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].name;
                textInput.onValueChanged = (sender) => {
                    nameValuePairs[i].name = sender.value;

                    this.collectionChanged(context, nameValuePairs, false);
                };

                const nameColumn = new Adaptive.Column("stretch");
                nameColumn.addItem(textInput);

                textInput = new Adaptive.TextInput();
                textInput.placeholder = this.valuePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].value;
                textInput.onValueChanged = (sender) => {
                    nameValuePairs[i].value = sender.value;

                    this.collectionChanged(context, nameValuePairs, false);
                };

                const valueColumn = new Adaptive.Column("stretch");
                valueColumn.spacing = Adaptive.Spacing.Small;
                valueColumn.addItem(textInput);

                const removeAction = new Adaptive.SubmitAction();
                removeAction.title = "X";
                removeAction.tooltip = "Remove";
                removeAction.onExecute = (sender) => {
                    nameValuePairs.splice(i, 1);

                    this.collectionChanged(context, nameValuePairs, true);
                };

                const newActionSet = new Adaptive.ActionSet();
                newActionSet.addAction(removeAction);

                const removeColumn = new Adaptive.Column("auto");
                removeColumn.spacing = Adaptive.Spacing.Small;
                removeColumn.addItem(newActionSet);

                const columnSet = new Adaptive.ColumnSet();
                columnSet.spacing = Adaptive.Spacing.Small;
                columnSet.addColumn(nameColumn);
                columnSet.addColumn(valueColumn);
                columnSet.addColumn(removeColumn);

                result.addItem(columnSet);
            }
        }

        const addAction = new Adaptive.SubmitAction();
        addAction.title = this.addButtonTitle;
        addAction.onExecute = (sender) => {
            nameValuePairs.push({ name: "", value: "" });

            this.collectionChanged(context, nameValuePairs, true);
        };

        const actionSet = new Adaptive.ActionSet();
        actionSet.spacing = Adaptive.Spacing.Small;
        actionSet.addAction(addAction);

        result.addItem(actionSet);

        return result;
    }

    constructor(
        readonly targetVersion: Adaptive.TargetVersion,
        readonly collectionPropertyName: string,
        readonly namePropertyName: string,
        readonly valuePropertyName: string,
        readonly createCollectionItem: (name: string, value: string) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
        readonly namePropertyLabel: string = "Name",
        readonly valuePropertyLabel: string = "Value",
        readonly addButtonTitle: string = "Add",
        readonly messageIfEmpty: string = "This collection is empty") {
        super(targetVersion);
    }
}
