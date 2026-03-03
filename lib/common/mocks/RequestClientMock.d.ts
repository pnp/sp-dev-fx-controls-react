import { SPHttpClient, SPHttpClientConfiguration, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
export declare class RequestClientMock extends SPHttpClient {
    Requests: {
        url: string;
        method: string;
        options?: ISPHttpClientOptions;
        resultString: string;
    }[];
    OnRequest: (url: string, method: string, options?: ISPHttpClientOptions) => void;
    fetch(url: string, configuration: SPHttpClientConfiguration, options: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
    fetchRaw(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
    get(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
    post(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
    patch(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
    delete(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse>;
}
//# sourceMappingURL=RequestClientMock.d.ts.map