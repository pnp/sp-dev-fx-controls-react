///<reference types="jest" />

import { assert } from "chai";
import SPTermStorePickerService from "../../src/services/SPTermStorePickerService";

const termStoreId = "11111111-1111-1111-1111-111111111111";
const termSetId = "22222222-2222-2222-2222-222222222222";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createService(props: any): { service: SPTermStorePickerService; suggestionRequests: any[] } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const suggestionRequests: any[] = [];
  const ctx = {
    pageContext: {
      web: { absoluteUrl: "https://test.sharepoint.com/sites/test-site", language: 1033 },
      cultureInfo: { currentUICultureName: "en-US" }
    },
    spHttpClient: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      post: (url: string, _config: any, options: any) => {
        if (url.indexOf("GetSuggestions") !== -1) {
          suggestionRequests.push(JSON.parse(options.body));
          return Promise.resolve({ json: () => Promise.resolve({ d: { Groups: [] } }) });
        }
        // Term store request
        return Promise.resolve({
          json: () => Promise.resolve([{
            _ObjectType_: "SP.Taxonomy.TermStore",
            Id: termStoreId,
            Groups: { _Child_Items_: [] }
          }])
        });
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service = new SPTermStorePickerService({ termsetNameOrID: termSetId, ...props }, ctx as any);
  return { service, suggestionRequests };
}

describe("SPTermStorePickerService", () => {
  // Terms not available for tagging are disabled in the tree, so search must never suggest them (#2110)
  test("searchTermsByName excludes terms not available for tagging by default", async () => {
    const { service, suggestionRequests } = createService({});
    await service.searchTermsByName("A");
    assert.equal(suggestionRequests.length, 1);
    assert.isFalse(suggestionRequests[0].isIncludeUnavailable);
  });

  test("searchTermsByName excludes terms not available for tagging when hideTagsNotAvailableForTagging is true", async () => {
    const { service, suggestionRequests } = createService({ hideTagsNotAvailableForTagging: true });
    await service.searchTermsByName("A");
    assert.isFalse(suggestionRequests[0].isIncludeUnavailable);
  });

  test("searchTermsByName keeps honouring hideDeprecatedTags", async () => {
    const shown = createService({});
    await shown.service.searchTermsByName("A");
    assert.isTrue(shown.suggestionRequests[0].isIncludeDeprecated);

    const hidden = createService({ hideDeprecatedTags: true });
    await hidden.service.searchTermsByName("A");
    assert.isFalse(hidden.suggestionRequests[0].isIncludeDeprecated);
  });
});
