function generateGuid() {
  const hex = '0123456789abcdef';
  let guid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      guid += '-';
    } else if (i === 14) {
      guid += '4';
    } else {
      guid += hex[Math.floor(Math.random() * 16)];
    }
  }
  return guid;
}

const Guid = {
  newGuid: () => {
    const id = generateGuid();
    return { toString: () => id };
  },
  parse: (val) => ({
    toString: () => val || generateGuid()
  }),
  tryParse: (val) => ({
    toString: () => val || generateGuid()
  }),
  empty: {
    toString: () => '00000000-0000-0000-0000-000000000000'
  },
  isValid: () => true
};

const DisplayMode = {
  Read: 1,
  Edit: 2
};

const Log = {
  info: () => {},
  warn: () => {},
  error: () => {},
  verbose: () => {}
};

const Version = {
  parse: (val) => ({ toString: () => val || '0.0.0' }),
  tryParse: (val) => ({ toString: () => val || '0.0.0' })
};

const Text = {
  format: (...args) => args.join(' ')
};

const FormDisplayMode = {
  Display: 1,
  Edit: 2,
  New: 3
};

const EnvironmentType = {
  ClassicSharePoint: 1,
  Local: 1,
  SharePoint: 2,
  Test: 0
};

const Environment = {
  type: EnvironmentType.SharePoint
};

module.exports = {
  Guid,
  DisplayMode,
  Log,
  Version,
  Text,
  FormDisplayMode,
  EnvironmentType,
  Environment
};
