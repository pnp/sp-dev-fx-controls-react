import { DynamicFormBase } from '../../../src/controls/dynamicForm/DynamicForm';
import { IDynamicFormProps } from '../../../src/controls/dynamicForm/IDynamicFormProps';
import { DynamicFormService, IDynamicFormSaveResult } from '../../../src/services/DynamicFormService';
import { listId, mockContext, webUrl } from '../../services/restTestHelpers';

jest.mock('../../../src/controls/dynamicForm/dynamicField', () => ({ DynamicField: (): null => null }));
jest.mock('../../../src/controls/filePicker', () => ({ FilePicker: (): null => null }));

function createForm(props: IDynamicFormProps): DynamicFormBase {
  const form = new DynamicFormBase(props);
  form.setState = (update, callback) => {
    Object.assign(form.state, typeof update === 'function' ? update(form.state, form.props) : update);
    callback?.();
  };
  form['getListInformation'] = jest.fn().mockResolvedValue(undefined);
  return form;
}

describe('DynamicForm submission target isolation', () => {
  afterEach(() => jest.restoreAllMocks());

  test.each(['web', 'list', 'item', 'unmount'])('invalidates a deferred submission after %s changes', async change => {
    const { context } = mockContext();
    let release: (cancel: boolean) => void;
    const before = new Promise<boolean>(resolve => { release = resolve; });
    const onSubmitted = jest.fn();
    const onSubmitError = jest.fn();
    const props: IDynamicFormProps = {
      context, listId, webAbsoluteUrl: webUrl, contentTypeId: '0x01',
      useFieldValidation: false, onBeforeSubmit: () => before, onSubmitted, onSubmitError
    };
    const writes = jest.spyOn(DynamicFormService.prototype, 'addItem');
    const form = createForm(props);
    const pending = form['onSubmitClick']();
    if (change === 'unmount') {
      form.componentWillUnmount();
    } else {
      const next = {
        ...props,
        ...(change === 'web' ? { webAbsoluteUrl: `${webUrl}-other` } : {}),
        ...(change === 'list' ? { listId: '22222222-2222-4222-8222-222222222222' } : {}),
        ...(change === 'item' ? { listItemId: 2 } : {})
      };
      Object.defineProperty(form, 'props', { value: next });
      form.componentDidUpdate(props, form.state);
    }
    const state = { ...form.state };
    release(false);
    await pending;
    expect(writes).not.toHaveBeenCalled();
    expect(onSubmitted).not.toHaveBeenCalled();
    expect(onSubmitError).not.toHaveBeenCalled();
    expect(form.state).toEqual(state);
  });

  test('does not deliver a completed old-target write to the replacement form', async () => {
    const { context } = mockContext();
    let release: (result: IDynamicFormSaveResult) => void;
    const write = new Promise<IDynamicFormSaveResult>(resolve => { release = resolve; });
    jest.spyOn(DynamicFormService.prototype, 'addItem').mockReturnValue(write);
    const onSubmitted = jest.fn();
    const props: IDynamicFormProps = { context, listId, contentTypeId: '0x01', useFieldValidation: false, onSubmitted };
    const form = createForm(props);
    const pending = form['onSubmitClick']();
    Object.defineProperty(form, 'props', { value: { ...props, webAbsoluteUrl: `${webUrl}-other` } });
    form.componentDidUpdate(props, form.state);
    const state = { ...form.state };
    release({ data: { Id: 1 }, reference: { webAbsoluteUrl: webUrl, listId, listItemId: 1 } });
    await pending;
    expect(onSubmitted).not.toHaveBeenCalled();
    expect(form.state).toEqual(state);
  });
});
