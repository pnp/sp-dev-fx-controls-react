import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { EnhancedThemeProvider } from '@pnp/spfx-controls-react/lib/EnhancedThemeProvider';
import { DynamicForm } from '@pnp/spfx-controls-react';
// import styles from './TestForm.module.scss';

export interface ITestFormProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

interface ITestFormState {}

const LOG_SOURCE: string = 'TestForm';

export default class TestForm extends React.Component<
  ITestFormProps,
  ITestFormState
> {
  constructor(props: ITestFormProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: TestForm mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: TestForm unmounted');
  }

  public render(): React.ReactElement<{}> {
    return (
      <EnhancedThemeProvider applyTo="element" context={this.props.context}>
        <DynamicForm
          context={this.props.context}
          listId={this.props.context.list.guid.toString()}
          listItemId={this.props.context.itemId}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onListItemLoaded={async (listItemData: any) => {
            console.log(listItemData);
          }}
        />
      </EnhancedThemeProvider>
    );
  }
}
