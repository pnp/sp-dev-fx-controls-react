import { RequestClient, FetchOptions } from "@pnp/common/src/netutil";

export class RequestClientMock implements RequestClient {
    public Requests: { url: string, method: string, options?: FetchOptions, resultString: string }[] = [];
    public OnRequest: (url: string, method: string, options?: FetchOptions) => void;
    public fetch(url: string, options?: FetchOptions): Promise<Response> {
        let mockedResponse = this.Requests.filter(req => req.method === options.method && req.url == url)[0];
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
        return Promise.resolve(response);
    }
    public fetchRaw(url: string, options?: FetchOptions): Promise<Response> {
        return this.fetch(url,options);
    }
    public get(url: string, options?: FetchOptions): Promise<Response> {
        options = options || {};
        options.method = "GET";
        return this.fetch(url,options);
    }
    public post(url: string, options?: FetchOptions): Promise<Response> {
        options = options || {};
        options.method = "POST";
        return this.fetch(url,options);
    }
    public patch(url: string, options?: FetchOptions): Promise<Response> {
        options = options || {};
        options.method = "PATCH";
        return this.fetch(url,options);
    }
    public delete(url: string, options?: FetchOptions): Promise<Response> {
        options = options || {};
        options.method = "DELETE";
        return this.fetch(url,options);
    }
}