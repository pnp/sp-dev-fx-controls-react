import { ISPService, ILibsOptions, LibsOrderBy } from "./ISPService";
import { ISPLists } from "../common/SPEntities";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class SPService implements ISPService {
    private readonly _context: IWebPartContext;
    constructor(context: IWebPartContext) {
        this._context = context;
    }
    public getLibs(options?: ILibsOptions): Promise<ISPLists> {
        let filtered: boolean;
        let queryUrl: string = `${this._context.pageContext.web.absoluteUrl}/_api/web/lists?$select=Title,id,BaseTemplate`;
        if (options.orderBy !== null) {
            queryUrl += `&$orderby=${options.orderBy === LibsOrderBy.Id ? 'Id': 'Title'}`;
        }
        if (options.baseTemplate !== null) {
            queryUrl += `&$filter=BaseTemplate eq ${options.baseTemplate}`;
            filtered = true;
        }
        if (options.includeHidden === false) {
            queryUrl += filtered ? ' and Hidden eq false' : '&$filter=Hidden eq false';
            filtered = true;
        }
        return this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            }) as Promise<ISPLists>;
    }
}

export default SPService;