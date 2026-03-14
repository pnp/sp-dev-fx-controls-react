function SPHttpClient() {}
SPHttpClient.configurations = { v1: 1 };

function HttpClient() {}
HttpClient.configurations = { v1: 1 };

function SPHttpClientResponse(response) {
  this._response = response;
}
SPHttpClientResponse.prototype.json = function() { return this._response.json(); };
SPHttpClientResponse.prototype.text = function() { return this._response.text(); };
Object.defineProperty(SPHttpClientResponse.prototype, 'ok', { get: function() { return this._response.ok; } });
Object.defineProperty(SPHttpClientResponse.prototype, 'status', { get: function() { return this._response.status; } });
Object.defineProperty(SPHttpClientResponse.prototype, 'statusText', { get: function() { return this._response.statusText; } });

function SPHttpClientConfiguration() {}

module.exports = {
  SPHttpClient: SPHttpClient,
  SPHttpClientConfiguration: SPHttpClientConfiguration,
  SPHttpClientResponse: SPHttpClientResponse,
  HttpClient: HttpClient
};
