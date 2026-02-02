/**
* Defines a http client to request mock data to use the web part with the local workbench
*/
var SPTermStoreMockHttpClient = /** @class */ (function () {
    function SPTermStoreMockHttpClient() {
    }
    /**
     * Mock method which returns mock terms stores
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SPTermStoreMockHttpClient.getTermStores = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTermStores);
        });
    };
    /**
     * Mock method wich returns mock terms
     */
    SPTermStoreMockHttpClient.getAllTerms = function () {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTerms);
        });
    };
    /**
     * Mock method wich returns mock terms
     */
    SPTermStoreMockHttpClient.getAllTermsByAnchorId = function () {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTermCollection);
        });
    };
    SPTermStoreMockHttpClient.searchTermsByName = function (searchText) {
        return new Promise(function (resolve) {
            resolve([
                {
                    key: "23d42658-26b2-4cb3-ac4f-f06493835485",
                    name: 'Brussels',
                    path: "Belgium;Brussels",
                    termSet: "635b5bca-8c5f-4831-8bf8-a0d9d5eb75e0",
                    termSetName: "Countries"
                },
                {
                    key: "2ae7add5-ee40-4365-af32-12e9f4fbca17",
                    name: 'Antwerp',
                    path: "Belgium;Antwerp",
                    termSet: "635b5bca-8c5f-4831-8bf8-a0d9d5eb75e0",
                    termSetName: "Countries"
                },
                {
                    key: "0ec2f948-3978-499e-9d3f-e51c4494d44c",
                    name: 'Belgium',
                    path: "Belgium",
                    termSet: "635b5bca-8c5f-4831-8bf8-a0d9d5eb75e0",
                    termSetName: "Countries"
                }
            ]);
        });
    };
    /**
    * Mock SharePoint result sample
    */
    SPTermStoreMockHttpClient._mockTermStores = [{
            "_ObjectType_": "SP.Taxonomy.TermStore",
            "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:st:generated-idwdg==",
            "Id": "\/Guid(fd32e8c4-99f8-402a-8444-4efed3df3076)\/",
            "Name": "Mock TermStore",
            "Groups": {
                "_ObjectType_": "SP.Taxonomy.TermGroupCollection",
                "_Child_Items_": [{
                        "_ObjectType_": "SP.Taxonomy.TermGroup",
                        "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:gr:generated-id-wdsWeHAWewaRChzC1Im8LcS8=",
                        "Name": "Mock TermGroup 1",
                        "Id": "\/Guid(051c9ec5-c19e-42a4-8730-b5226f0b712f)\/",
                        "IsSystemGroup": false,
                        "TermSets": {
                            "_ObjectType_": "SP.Taxonomy.TermSetCollection",
                            "_Child_Items_": [{
                                    "_ObjectType_": "SP.Taxonomy.TermSet",
                                    "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-wdsWeHAWewaRChzC1Im8LcS\u002fwbRtbognrQqP2AGVWYhkx",
                                    "Name": "Mock TermSet 1",
                                    "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                                    "Description": "",
                                    "Names": {
                                        "1033": "Mock TermSet 1"
                                    }
                                }]
                        }
                    }]
            }
        }];
    SPTermStoreMockHttpClient._mockTerms = {
        "_ObjectType_": "SP.Taxonomy.TermSet",
        "_ObjectIdentity_": "a4f45d9e-7003-5000-7d35-b4064108885e|fec14c62-7c3b-481b-851b-c80d7802b224:se:15WaN9o+nUi6qkivmCMKhxA4k0b3ed9BqbnSqve6DjrKW1tjX4wxSIv4oNnV63Xg",
        "Id": "/Guid(635b5bca-8c5f-4831-8bf8-a0d9d5eb75e0)/",
        "Name": "Countries",
        "Description": "",
        "Names": { "1033": "Countries" },
        "Terms": [{
                "_ObjectType_": "SP.Taxonomy.Term",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-SPnCDng5nkmdP+UcRJTUTA==",
                "Name": "Belgium",
                "Id": "0ec2f948-3978-499e-9d3f-e51c4494d44c",
                "Description": "",
                "IsDeprecated": false,
                "IsAvailableForTagging": false,
                "IsRoot": true,
                "PathOfTerm": "Belgium",
                "PathDepth": 1,
                "TermSet": {
                    "_ObjectType_": "SP.Taxonomy.TermSet",
                    "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                    "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                    "Name": "Country"
                }
            }, {
                "_ObjectType_": "SP.Taxonomy.Term",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-1a3nKkDuZUOvMhLp9PvKFw==",
                "Id": "2ae7add5-ee40-4365-af32-12e9f4fbca17",
                "Name": "Antwerp",
                "Description": "",
                "IsDeprecated": false,
                "IsAvailableForTagging": false,
                "IsRoot": false,
                "PathOfTerm": "Belgium;Antwerp",
                "PathDepth": 2,
                "TermSet": {
                    "_ObjectType_": "SP.Taxonomy.TermSet",
                    "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                    "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                    "Name": "Country"
                }
            }, {
                "_ObjectType_": "SP.Taxonomy.Term",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-WCbUI7Ims0ysT\u002fBkk4NUhQ==",
                "Name": "Brussels",
                "Id": "23d42658-26b2-4cb3-ac4f-f06493835485",
                "Description": "",
                "IsDeprecated": false,
                "IsAvailableForTagging": true,
                "IsRoot": false,
                "PathOfTerm": "Belgium;Brussels",
                "PathDepth": 2,
                "TermSet": {
                    "_ObjectType_": "SP.Taxonomy.TermSet",
                    "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                    "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                    "Name": "Country"
                }
            }, {
                "_ObjectType_": "SP.Taxonomy.Term",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-WCbUI7Ims0ysT\u002fBkk4NUhQ==",
                "Name": "Deprecated",
                "Id": "23d42658-26b2-4cb3-ac4f-f06493835486",
                "Description": "",
                "IsDeprecated": true,
                "IsAvailableForTagging": false,
                "IsRoot": true,
                "PathOfTerm": "Deprecated",
                "PathDepth": 1,
                "TermSet": {
                    "_ObjectType_": "SP.Taxonomy.TermSet",
                    "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                    "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                    "Name": "Country"
                }
            }]
    };
    SPTermStoreMockHttpClient._mockTermCollection = [{
            "_ObjectType_": "SP.Taxonomy.Term",
            "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-SPnCDng5nkmdP+UcRJTUTA==",
            "Name": "Belgium",
            "Id": "0ec2f948-3978-499e-9d3f-e51c4494d44c",
            "Description": "",
            "IsDeprecated": false,
            "IsAvailableForTagging": false,
            "IsRoot": true,
            "PathOfTerm": "Belgium",
            "PathDepth": 1,
            "TermSet": {
                "_ObjectType_": "SP.Taxonomy.TermSet",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                "Name": "Country"
            }
        }, {
            "_ObjectType_": "SP.Taxonomy.Term",
            "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-1a3nKkDuZUOvMhLp9PvKFw==",
            "Id": "2ae7add5-ee40-4365-af32-12e9f4fbca17",
            "Name": "Antwerp",
            "Description": "",
            "IsDeprecated": false,
            "IsAvailableForTagging": false,
            "IsRoot": false,
            "PathOfTerm": "Belgium;Antwerp",
            "PathDepth": 2,
            "TermSet": {
                "_ObjectType_": "SP.Taxonomy.TermSet",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                "Name": "Country"
            }
        }, {
            "_ObjectType_": "SP.Taxonomy.Term",
            "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-WCbUI7Ims0ysT\u002fBkk4NUhQ==",
            "Name": "Brussels",
            "Id": "23d42658-26b2-4cb3-ac4f-f06493835485",
            "Description": "",
            "IsDeprecated": false,
            "IsAvailableForTagging": true,
            "IsRoot": false,
            "PathOfTerm": "Belgium;Brussels",
            "PathDepth": 2,
            "TermSet": {
                "_ObjectType_": "SP.Taxonomy.TermSet",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                "Name": "Country"
            }
        }, {
            "_ObjectType_": "SP.Taxonomy.Term",
            "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:te:generated-id-WCbUI7Ims0ysT\u002fBkk4NUhQ==",
            "Name": "Deprecated",
            "Id": "23d42658-26b2-4cb3-ac4f-f06493835486",
            "Description": "",
            "IsDeprecated": true,
            "IsAvailableForTagging": false,
            "IsRoot": true,
            "PathOfTerm": "Deprecated",
            "PathDepth": 1,
            "TermSet": {
                "_ObjectType_": "SP.Taxonomy.TermSet",
                "_ObjectIdentity_": "5e06ddd0-d2dd-4fff-bcc0-42b40f4aa59e|4dbeb936-1813-4630-a4bd-9811df3fe7f1:se:generated-id-",
                "Id": "\/Guid(5b1b6df0-09a2-42eb-a3f6-006556621931)\/",
                "Name": "Country"
            }
        }];
    return SPTermStoreMockHttpClient;
}());
export default SPTermStoreMockHttpClient;
//# sourceMappingURL=SPTermStorePickerMockService.js.map