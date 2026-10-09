import {
  buildSPFilePickerConfiguration,
  isExpectedPickerInitializeEvent,
  requireAccessToken,
  type ISPFilePickerInitializeEvent,
} from './SPFilePicker.helpers';

describe('SPFilePicker helpers', () => {
  describe('buildSPFilePickerConfiguration', () => {
    it('builds a token-authenticated file picker configuration', () => {
      const configuration = buildSPFilePickerConfiguration({
        channelId: 'channel-id',
        parentOrigin: 'https://host.contoso.com',
        selectionMode: 'multiple',
        itemsMode: 'files',
        fileTypes: ['docx', 'pdf'],
        authMode: 'token',
      });

      expect(configuration).toMatchObject({
        sdk: '8.0',
        entry: { sharePoint: {} },
        authentication: {},
        messaging: {
          origin: 'https://host.contoso.com',
          channelId: 'channel-id',
        },
        selection: { mode: 'multiple' },
        typesAndSources: {
          mode: 'files',
          filters: ['docx', 'pdf'],
        },
      });
    });

    it('omits host authentication in cookie mode', () => {
      const configuration = buildSPFilePickerConfiguration({
        channelId: 'channel-id',
        parentOrigin: 'https://host.contoso.com',
        selectionMode: 'single',
        itemsMode: 'all',
        authMode: 'cookie',
      });

      expect(configuration).not.toHaveProperty('authentication');
      expect(configuration.messaging).toEqual({
        origin: 'https://host.contoso.com',
        channelId: 'channel-id',
        identifyParent: true,
      });
    });
  });

  describe('isExpectedPickerInitializeEvent', () => {
    const pickerWindow = window;
    const expectedOrigin = 'https://contoso.sharepoint.com';
    const channelId = 'channel-id';

    const createEvent = (
      overrides: Partial<ISPFilePickerInitializeEvent> = {},
    ): ISPFilePickerInitializeEvent => ({
      data: { type: 'initialize', channelId },
      origin: expectedOrigin,
      source: pickerWindow,
      ...overrides,
    });

    it('accepts initialization from the expected picker window', () => {
      expect(
        isExpectedPickerInitializeEvent(
          createEvent(),
          pickerWindow,
          channelId,
          expectedOrigin,
        ),
      ).toBe(true);
    });

    it.each([
      ['origin', { origin: 'https://attacker.example' }],
      ['window', { source: null }],
      ['channel', { data: { type: 'initialize', channelId: 'other-channel' } }],
      ['message type', { data: { type: 'other', channelId } }],
    ])('rejects initialization with the wrong %s', (_name, overrides) => {
      expect(
        isExpectedPickerInitializeEvent(
          createEvent(overrides),
          pickerWindow,
          channelId,
          expectedOrigin,
        ),
      ).toBe(false);
    });
  });

  describe('requireAccessToken', () => {
    it('returns a valid token', () => {
      expect(requireAccessToken('access-token', 'missing token')).toBe(
        'access-token',
      );
    });

    it('rejects an empty token', () => {
      expect(() => requireAccessToken('', 'missing token')).toThrow(
        'missing token',
      );
    });
  });
});
