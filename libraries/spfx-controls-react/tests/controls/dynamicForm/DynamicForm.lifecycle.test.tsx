import { DynamicFormBase } from '../../../src/controls/dynamicForm/DynamicForm';
import { IDynamicFormProps } from '../../../src/controls/dynamicForm/IDynamicFormProps';
import { DynamicFormService, DynamicFormSaveError, IDynamicFormSaveResult } from '../../../src/services/DynamicFormService';
import SPService from '../../../src/services/SPService';
import { SPTaxonomyService } from '../../../src/services/SPTaxonomyService';
import { ClientFormFieldInfo, IRenderListDataAsStreamClientFormResult } from '../../../src/services/ISPService';
import { listId, mockContext, webUrl } from '../../services/restTestHelpers';

jest.mock('../../../src/controls/dynamicForm/dynamicField', () => ({ DynamicField: (): null => null }));
jest.mock('../../../src/controls/filePicker', () => ({ FilePicker: (): null => null }));

function createForm(props: IDynamicFormProps, stubLoad = true): DynamicFormBase {
  const form = new DynamicFormBase(props);
  form.setState = (update, callback) => {
    Object.assign(form.state, typeof update === 'function' ? update(form.state, form.props) : update);
    callback?.();
  };
  if (stubLoad) form['getListInformation'] = jest.fn().mockResolvedValue(undefined);
  return form;
}

function deferred<T>() {
  let resolve: (value: T) => void;
  const promise = new Promise<T>(complete => { resolve = complete; });
  return { promise, resolve };
}

const savedResult: IDynamicFormSaveResult = {
  data: { Id: 1 }, reference: { webAbsoluteUrl: webUrl, listId, listItemId: 1 }
};

describe('DynamicForm submission target isolation', () => {
  afterEach(() => jest.restoreAllMocks());

  test.each(['download', 'upload', 'partial-commit'])('preserves submitted values when document %s fails', async failure => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { context } = mockContext();
    const error = failure === 'partial-commit'
      ? new DynamicFormSaveError(
        { webAbsoluteUrl: webUrl, listId, serverRelativeUrl: '/sites/test/Documents/a.txt' },
        new Error('Metadata failed'), 'metadata', true
      ) : new Error(`${failure} failed`);
    const content = new File(['content'], 'a.txt', { type: 'text/plain' });
    const downloadFileContent = failure === 'download'
      ? jest.fn().mockRejectedValue(error) : jest.fn().mockResolvedValue(content);
    const upload = jest.spyOn(DynamicFormService.prototype, 'addFile').mockRejectedValue(error);
    const onSubmitError = jest.fn();
    const onSubmitted = jest.fn();
    const form = createForm({
      context, listId, contentTypeId: '0x0101', enableFileSelection: true,
      useFieldValidation: false, onSubmitError, onSubmitted
    });
    form.setState({
      selectedFile: {
        fileName: 'a.txt', fileNameWithoutExtension: 'a', fileAbsoluteUrl: undefined, downloadFileContent
      },
      fieldCollection: [{
        context, columnInternalName: 'Title', fieldType: 'Text', required: false, disabled: false,
        defaultValue: '', value: '', newValue: 'Submitted title', stringValue: '', Order: 0, firstDayOfWeek: 0
      }]
    });
    await form['onSubmitClick']();

    expect(onSubmitError).toHaveBeenCalledTimes(1);
    expect(onSubmitError).toHaveBeenCalledWith({ Title: 'Submitted title', ContentTypeId: '0x0101' }, error);
    expect(onSubmitted).not.toHaveBeenCalled();
    expect(upload).toHaveBeenCalledTimes(failure === 'download' ? 0 : 1);
    if (failure !== 'download') expect(onSubmitError.mock.calls[0][0]).toBe(upload.mock.calls[0][3]);
    expect(form.state.isSaving).toBe(false);
    expect(form.state.infoErrorMessages[0].message).toBe(error.message);
  });

  test('locks synchronously before validation even when React has not applied saving state', async () => {
    const { context } = mockContext();
    const writes = jest.spyOn(DynamicFormService.prototype, 'addItem').mockResolvedValue(savedResult);
    const onSubmitted = jest.fn();
    const form = createForm({ context, listId, contentTypeId: '0x01', onSubmitted });
    form.setState = jest.fn();
    const validation = deferred<Record<string, string>>();
    form['evaluateFormulas'] = jest.fn().mockReturnValue(validation.promise);

    const first = form['onSubmitClick']();
    const second = form['onSubmitClick']();
    expect(form['evaluateFormulas']).toHaveBeenCalledTimes(1);
    validation.resolve({});
    await Promise.all([first, second]);
    expect(writes).toHaveBeenCalledTimes(1);
    expect(onSubmitted).toHaveBeenCalledTimes(1);
  });

  test.each(['validation', 'missing-file', 'cancellation', 'exception'])('releases the submission lock after %s', async exit => {
    const { context } = mockContext();
    const writes = jest.spyOn(DynamicFormService.prototype, 'addItem').mockResolvedValue(savedResult);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const onBeforeSubmit = jest.fn().mockResolvedValue(false);
    if (exit === 'cancellation') onBeforeSubmit.mockResolvedValueOnce(true);
    const props: IDynamicFormProps = {
      context, listId, contentTypeId: exit === 'missing-file' ? '0x0101' : '0x01',
      enableFileSelection: exit === 'missing-file', onBeforeSubmit
    };
    const form = createForm(props);
    const validation = jest.fn().mockReturnValue({});
    if (exit === 'validation') validation.mockReturnValueOnce({ Title: 'Required' });
    if (exit === 'exception') validation.mockImplementationOnce(() => { throw new Error('Validation failed'); });
    form['evaluateFormulas'] = validation;

    await form['onSubmitClick']();
    expect(writes).not.toHaveBeenCalled();
    expect(form.state.isSaving).toBe(false);
    if (exit === 'missing-file') Object.defineProperty(form, 'props', { value: { ...props, enableFileSelection: false } });
    await form['onSubmitClick']();
    expect(writes).toHaveBeenCalledTimes(1);
  });

  test('an obsolete submission cannot release the replacement submission lock', async () => {
    const { context } = mockContext();
    const firstGate = deferred<boolean>();
    const secondGate = deferred<boolean>();
    const writes = jest.spyOn(DynamicFormService.prototype, 'addItem').mockResolvedValue(savedResult);
    const props: IDynamicFormProps = {
      context, listId, contentTypeId: '0x01', useFieldValidation: false,
      onBeforeSubmit: () => firstGate.promise
    };
    const form = createForm(props);
    const first = form['onSubmitClick']();
    const replacementBefore = jest.fn().mockReturnValue(secondGate.promise);
    Object.defineProperty(form, 'props', { value: { ...props, webAbsoluteUrl: `${webUrl}-other`, onBeforeSubmit: replacementBefore } });
    form.componentDidUpdate(props, form.state);
    const second = form['onSubmitClick']();
    firstGate.resolve(false);
    await first;
    await form['onSubmitClick']();
    expect(replacementBefore).toHaveBeenCalledTimes(1);
    secondGate.resolve(false);
    await second;
    expect(writes).toHaveBeenCalledTimes(1);
  });

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

  describe('DynamicForm load isolation', () => {
    afterEach(() => jest.restoreAllMocks());

    function renderInfo(fields: ClientFormFieldInfo[] = []): IRenderListDataAsStreamClientFormResult {
      return {
        ContentTypeIdToNameMap: { '0x01': 'Item' }, ClientForms: { Edit: { Item: fields } },
        ClientFormCustomFormatter: {}, EnableAttachments: 'false', FormRenderModes: {}
      };
    }

    function replaceTarget(form: DynamicFormBase, props: IDynamicFormProps): void {
      form['getListInformation'] = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(form, 'props', { value: { ...props, webAbsoluteUrl: `${webUrl}-other`, listId: '22222222-2222-4222-8222-222222222222' } });
      form.componentDidUpdate(props, form.state);
    }

    test.each(['schema', 'fields', 'callback'])('stops an obsolete load after awaiting %s', async phase => {
      const { context } = mockContext();
      const entered = deferred<void>();
      const gate = deferred<void>();
      const schema = jest.spyOn(SPService.prototype, 'getListFormRenderInfo').mockImplementation(async () => {
        if (phase === 'schema') { entered.resolve(); await gate.promise; }
        return renderInfo();
      });
      const fields = jest.spyOn(SPService.prototype, 'getAdditionalListFormFieldInfo').mockImplementation(async () => {
        if (phase === 'fields') { entered.resolve(); await gate.promise; }
        return [];
      });
      const getItem = jest.spyOn(DynamicFormService.prototype, 'getItem').mockResolvedValue({ Id: 1 });
      const onListItemLoaded = jest.fn(async () => {
        entered.resolve();
        await gate.promise;
      });
      const props: IDynamicFormProps = { context, listId, listItemId: 1, contentTypeId: '0x01', onListItemLoaded };
      const form = createForm(props, false);
      const buildFields = jest.spyOn(form, 'setState');
      const pending = form['getListInformation']();
      await entered.promise;
      replaceTarget(form, props);
      buildFields.mockClear();
      gate.resolve();
      await pending;

      expect(schema).toHaveBeenCalledTimes(1);
      expect(fields).toHaveBeenCalledTimes(phase === 'schema' ? 0 : 1);
      expect(getItem).toHaveBeenCalledTimes(phase === 'callback' ? 1 : 0);
      expect(onListItemLoaded).toHaveBeenCalledTimes(phase === 'callback' ? 1 : 0);
      expect(buildFields).not.toHaveBeenCalled();
      expect(form.state.fieldCollection).toEqual([]);
    });

    test('does not resolve a taxonomy term through a replacement service after its label read', async () => {
      const { context } = mockContext();
      const entered = deferred<void>();
      const gate = deferred<void>();
      const field = {
        InternalName: 'Category', FieldType: 'TaxonomyFieldType', Type: 'Lookup', Title: 'Category',
        Hidden: false, DefaultValue: '', TermSetId: listId, AnchorId: '00000000-0000-0000-0000-000000000000'
      } as ClientFormFieldInfo;
      jest.spyOn(SPService.prototype, 'getListFormRenderInfo').mockResolvedValue(renderInfo([field]));
      jest.spyOn(SPService.prototype, 'getAdditionalListFormFieldInfo').mockResolvedValue([]);
      jest.spyOn(DynamicFormService.prototype, 'getItem').mockResolvedValue({ Id: 1 });
      jest.spyOn(SPService.prototype, 'getSingleManagedMetadataLabel').mockImplementation(async () => {
        entered.resolve();
        await gate.promise;
        return { TermID: listId, Label: 'Term' };
      });
      const termRequest = jest.spyOn(SPTaxonomyService.prototype, 'getTermById');
      const props: IDynamicFormProps = { context, listId, listItemId: 1, contentTypeId: '0x01', useModernTaxonomyPicker: true };
      const form = createForm(props, false);
      const pending = form['getListInformation']();
      await entered.promise;
      replaceTarget(form, props);
      gate.resolve();
      await pending;
      expect(termRequest).not.toHaveBeenCalled();
      expect(form.state.fieldCollection).toEqual([]);
    });

    test('loads the current target successfully with its captured context', async () => {
      const { context } = mockContext();
      const schema = jest.spyOn(SPService.prototype, 'getListFormRenderInfo').mockResolvedValue(renderInfo());
      const fields = jest.spyOn(SPService.prototype, 'getAdditionalListFormFieldInfo').mockResolvedValue([]);
      const form = createForm({ context, listId, webAbsoluteUrl: webUrl, contentTypeId: '0x01' }, false);
      await form['getListInformation']();
      expect(schema).toHaveBeenCalledWith(listId, webUrl);
      expect(fields).toHaveBeenCalledWith(listId, webUrl);
      expect(form.state.contentTypeId).toBe('0x01');
      expect(form.state.infoErrorMessages).toEqual([]);
    });
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
