import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import {
  CheckboxVisibility,
  DetailsList,
  DetailsListSelectionMode,
  IColumn,
  IDetailsListGroup,
} from '../../DetailsList';

interface ITestItem {
  id: string;
  name: string;
}

const columns: IColumn<ITestItem>[] = [
  { key: 'name', name: 'Name', fieldName: 'name', minWidth: 120 },
];

const items: ITestItem[] = [
  { id: 'one', name: 'One' },
  { id: 'two', name: 'Two' },
];

const groups: IDetailsListGroup<ITestItem>[] = [
  { key: 'planning', name: 'Planning', startIndex: 0, count: items.length },
];

describe('DetailsList', () => {
  let detailsList: ReactWrapper | undefined;

  afterEach(() => {
    detailsList?.unmount();
    detailsList = undefined;
  });

  it('renders with Fluent UI 9 controls on the React 17 runtime', () => {
    detailsList = mount(
      <DetailsList
        items={items}
        columns={columns}
        getKey={(item) => item.id}
        selectionMode={DetailsListSelectionMode.multiple}
        checkboxVisibility={CheckboxVisibility.always}
      />,
    );

    expect(detailsList.find('[role="grid"]').exists()).toBe(true);
    expect(detailsList.find('[role="row"]').length).toBe(3);
    expect(detailsList.find('input[type="checkbox"]').length).toBe(3);
    expect(detailsList.text()).toContain('One');
    expect(detailsList.text()).toContain('Two');
  });

  it('aligns group headers with the leading edge', () => {
    detailsList = mount(
      <DetailsList
        items={items}
        columns={columns}
        groups={groups}
        getKey={(item) => item.id}
      />,
    );

    expect(detailsList.find('button[role="gridcell"]').first().prop('style')).toMatchObject({
      justifyContent: 'flex-start',
      textAlign: 'left',
    });
  });
});
