import { SPHttpClient, SPHttpClientConfiguration, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

export class RequestClientMock extends SPHttpClient {
    public Requests: { url: string, method: string, options?: ISPHttpClientOptions, resultString: string }[] = [];
    public OnRequest: (url: string, method: string, options?: ISPHttpClientOptions) => void;
    public fetch(url: string, configuration: SPHttpClientConfiguration, options: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        const mockedResponse = this.Requests.filter(req => req.method === options.method && req.url === url)[0];
        let response: Response;
        if (mockedResponse) {
            response = new Response(mockedResponse.resultString, {
                status: 200,
                statusText: "Ok"
            });
        }
        else {
            response = new Response(null, {
                status: 404,
                statusText: "Not fount",
            });
        }
        return Promise.resolve(new SPHttpClientResponse(response));
    }
    public fetchRaw(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        return this.fetch(url, configuration, options);
    }
    public get(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        options = options || {};
        options.method = "GET";
        return this.fetch(url, configuration, options);
    }
    public post(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        options = options || {};
        options.method = "POST";
        return this.fetch(url, configuration, options);
    }
    public patch(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        options = options || {};
        options.method = "PATCH";
        return this.fetch(url, configuration, options);
    }
    public delete(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        options = options || {};
        options.method = "DELETE";
        return this.fetch(url, configuration, options);
    }
}
