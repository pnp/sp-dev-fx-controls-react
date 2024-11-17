///<reference types="jest" />

import { assert } from "chai";
import { ILibsOptions, LibsOrderBy } from "../../src/services/ISPService";
import SPService from "../../src/services/SPService";

describe("SPService", () => {
    test("getField (positive)", async () => {
        let calledApi = "";
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    calledApi = apiUrl;
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            Id: "test-field-id"
                        })
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        let field = await spService.getField("test-list-id", "test-internal-column-name");
        assert.equal(field.Id, "test-field-id");
        assert.equal(calledApi, "https://test.sharepoint.com/sites/test-site/_api/web/lists('test-list-id')/fields/getByInternalNameOrTitle('test-internal-column-name')");
    });
    test("getField (positive - calculated)", async () => {
        let calledApi = "";
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    calledApi = apiUrl;
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            Id: "test-field-id",
                            SchemaXml: `<Field Type="Calculated" DisplayName="TestCalculated" ResultType="Text"><Formula>=CONCATENATE(Title," Test")</Formula><FieldRefs><FieldRef Name="Title" /></FieldRefs></Field>`,
                            TypeAsString: "Calculated"
                        })
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        let field = await spService.getField("test-list-id", "test-internal-column-name");
        assert.equal(field.Id, "test-field-id");
        assert.equal(field.ResultType, "Text");
        assert.equal(calledApi, "https://test.sharepoint.com/sites/test-site/_api/web/lists('test-list-id')/fields/getByInternalNameOrTitle('test-internal-column-name')");
    });
    test("getField (negative)", async () => {
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    return Promise.resolve({
                        ok: false,
                        json: () => Promise.resolve({
                            Id: "test-field-id"
                        })
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        let field = await spService.getField("test-list-id", "test-internal-column-name");
        assert.isUndefined(field);
    });
    test("getField (negative [exception])", async () => {
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    throw "Test exception"
                }
            }
        }
        let spService = new SPService(ctx as any);
        try {
            let field = await spService.getField("test-list-id", "test-internal-column-name");
            throw "No error thrown";
        }
        catch (err) {
            assert.equal(err, "Test exception");
        }
    });

    test.each([
        [
            {

            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate"
        ],
        [
            {
                orderBy: LibsOrderBy.Id
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$orderby=Id"
        ],
        [
            {
                orderBy: LibsOrderBy.Title
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$orderby=Title"
        ],
        [
            {
                filter: "Title eq 'Test'"
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$filter=Title%20eq%20'Test'"
        ],
        [
            {
                orderBy: LibsOrderBy.Title,
                filter: "Title eq 'Test'"
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$orderby=Title&$filter=Title%20eq%20'Test'"
        ],
        [
            {
                filter: "Title eq 'Test'",
                baseTemplate: 101
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$filter=Title%20eq%20'Test'"
        ],
        [
            {
                baseTemplate: 101
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$filter=BaseTemplate eq 101"
        ],
        [
            {
                baseTemplate: 101,
                includeHidden: false
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$filter=BaseTemplate eq 101 and Hidden eq false"
        ],
        [
            {
                includeHidden: false
            },
            "https://test.sharepoint.com/sites/test-site/_api/web/lists?$select=Title,id,BaseTemplate&$filter=Hidden eq false"
        ]
    ])("getLibs %j", async (options: ILibsOptions, expectedApi: string) => {
        let calledApi;
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    calledApi = apiUrl;
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve([])
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        await spService.getLibs(options);

        assert.equal(calledApi, expectedApi);
    });
    test("getLibs (negative)", async () => {
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string) => {
                    return Promise.resolve({
                        ok: false,
                        json: () => Promise.resolve([])
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        let libs = await spService.getLibs({});

        assert.isNull(libs);
    });
    test.each([[
        "test filter",
        "TestFieldName",
        undefined,
        undefined,
        "https://test.sharepoint.com/sites/test-site/_api/web/lists('test-list-id')/items?$select=Id,TestFieldName&$filter=startswith(TestFieldName,'test%20filter')&$orderby=undefined"
    ]
    ])("getListItems %j", async (filterText, columnName, field, keyColumnName, expectedApi) => {
        let calledApi;
        let ctx = {
            pageContext: {
                web: {
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            },
            spHttpClient: {
                get: (apiUrl: string,) => {
                    calledApi = apiUrl;
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve([])
                    });
                }
            }
        }
        let spService = new SPService(ctx as any);
        let items = await spService.getListItems(filterText, "test-list-id", columnName, field, keyColumnName);
        assert.equal(calledApi, expectedApi);
    });
});