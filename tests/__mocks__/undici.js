// Mock undici to avoid missing Web API globals (TextEncoder, ReadableStream, MessagePort, etc.)
// undici is pulled in by cheerio 1.0.0 but is not needed for enzyme-based tests.
module.exports = {};
