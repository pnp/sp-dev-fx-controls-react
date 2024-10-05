/**
 * Script executes the translation of the localization keys for the provided languages (config/supported.localization.json) with the usage of the Azure Cognitive services.
 * In case the language localization file doesn't exist, it is going to be created.
 * Only languages supported by Azure Cognitive services are supported.
 *
 * English is used as a main language. The translation is executed for the keys which are the same as in English or are missing.
 */


const path = require('path');
const fs = require('fs');
const _ = require('lodash');
// Cognitive services
const request = require('request-promise');
const uuidv4 = require('uuid');

// Replace with process.env.subscriptionKey to get an access to Azure Cognitive services
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const endpoint = "https://api.cognitive.microsofttranslator.com";

const locHelper = require('./export-localization');
// Load configuration for supported languages
const languagesConfiguration = require('../config/supported.localization.json');

/**
 * Obtain auth token for the global cognitive services  endpoint from region (WestEurope)
 */
let authToken = null;
async function getAuthToken() {
  try {
    // Cache AuthToken
    if (authToken) {
      return authToken;
    }

    const options = {
      method: 'POST',
      url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/x-www-form-urlencoded',
        'Content-length': 0
      }
    }

    const token = await request(options);
    if (!token || token.length < 0) {
      throw new Error("Somethig went wrong when obtaining Auth token!");
    }

    // Cache Auth token
    authToken = token;
  return token;
  }
  catch (err) {
    console.error(`[Exception]: Cannot obtain Auth token. Err=${err}`)
    return null;
  }
}

/**
 * Function executes the translation using cognitive services.
 */
async function executeTranslation(lang, inputObj) {
  try {
    const authToken = await getAuthToken();
    let options = {
      method: 'POST',
      baseUrl: endpoint,
      url: 'translate',
      qs: {
        'api-version': '3.0',
        'to': [`${lang}`]
      },
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      body: inputObj,
      json: true,
    };

    const response = await request(options);
    if (!response || response.length < 0) {
      throw new Error("Somethig went wrong when obtaining translated text!");
    }

    // Go through all the results
    const translations = response.map((item) => {
      // Every translation is in a separate 1-element array -> make it flat
      return item.translations[0];
    })

    return translations;
  } catch (err) {
    console.error(`[Exception]: Cannot execute translation for lang - ${lang}. Err=${err}`)
    return null;
  }
}

function compareTranslationKeys(srcObj, dstObj) {
  // Extract all the keys and set them in alpabetyical order
  let dstKeys = Object.keys(dstObj);

  let toTranslate = [];
  // Array<string>
  try {
    dstKeys.forEach((locKey) => {
      if (typeof srcObj[locKey] !== "string") {
        // In case we have nested translation objects
        toTranslate = toTranslate.concat(compareTranslationKeys(srcObj[locKey], dstObj[locKey]));
      } else if (srcObj[locKey] === dstObj[locKey]) {
        // In case the english value is the same as localized one, add it to translate
        toTranslate.push(srcObj[locKey]);
      }
    });
  } catch (error) {
    console.log(error.message);
  }


  return toTranslate;
}

let currentTranslationIndex = 0;
function injectTranslatedKeys(srcObj, dstObj, translatedValues) {
  const srcKeys = Object.keys(srcObj);
  srcKeys.forEach((locKey) => {
    if (typeof srcObj[locKey] !== "string") {
      dstObj[locKey] = injectTranslatedKeys(srcObj[locKey], dstObj[locKey], translatedValues);
    } else if (srcObj[locKey] === dstObj[locKey]) {
      const translatedKey = translatedValues[currentTranslationIndex++];
      dstObj[locKey] = translatedKey ? translatedKey : dstObj[locKey];
    }
  });

  return dstObj;
}

function prepareTranslationRequestMsg(wordsToTranslate) {
  // Execute translation for every 50 words in batch
  const result = [];
  const chunk = 50;
  for (let i = 0; i < wordsToTranslate.length; i += chunk) {
    const slicedWords = wordsToTranslate.slice(i, i + chunk);
    const slicedMessages = [];
    // do whatever
    slicedWords.forEach((word) => {
      slicedMessages.push({
        //'text': encodeURI(word)
        'text': word
      });
    });
    result.push(slicedMessages);
  }

  return result;
}

function extranctTranslatedKeys(translatedMsgs) {
  // Flatten the result to retrieve original structure of the keys array
  const translatedKeys = [];
  translatedMsgs.forEach((keys) => {
    keys.forEach((translationMsg) => {
      // There is often a replacement of '||' to ' | | ' during the translation
      // Replace  ' | | ' to '||'
      const translationResult = translationMsg.text ? translationMsg.text.replace(" | | ", "||") : translationMsg.text;
      translatedKeys.push(translationResult);
    })
  });

  return translatedKeys;
}

async function executeLocalizationTranslation(srcObj, langObj, lang) {
  try {
    // Initialize result object with all english keys and localized keys
    const dstLoc = Object.assign({}, srcObj, langObj);

    // Prepare keys to translate
    const keysToTranslate = compareTranslationKeys(srcObj, dstLoc);

    if (keysToTranslate && keysToTranslate.length <= 0) {
      console.log(`There are no keys to translate`);
      dstLoc;
    }
    console.log(`There are ${keysToTranslate.length} keys to translate.`)

    // Split the array to separate calls in case max limit of carachters (5000) is reached and execute translation
    const requestMessges = prepareTranslationRequestMsg(keysToTranslate);
    const promises = [];
    requestMessges.forEach((msgBody) => {
      promises.push(executeTranslation(lang, msgBody));
    });

    const translatedMsgs = await Promise.all(promises);
    const translatedKeys = extranctTranslatedKeys(translatedMsgs);

    // Inject translated keys into dstLoc object
    // Reset the global rec counter
    currentTranslationIndex = 0;
    const result = injectTranslatedKeys(srcObj, dstLoc, translatedKeys);

    return result;
  } catch (err) {
    console.log(`[Exception]: executeLocalizationTranslation : ${err.message}`);
    return null;
  }
}

const run = async () => {
  // Load files in the localization directory
  const locDirPath = path.join(__dirname, '../src/loc');
  let locFiles = fs.readdirSync(locDirPath);
  locFiles = locFiles.filter(f => f !== "mystrings.d.ts" && f != "en-us.ts");

  // Load main localization file
  const mainLoc = locHelper.getSPLocalizationFileAsJSON('en-us');

  // Iterate over all supported languages and prepare translation request
  for (const lang of languagesConfiguration.langs) {
    console.log(`Processing ${lang}.`);

    // If current loc file doesn't exist - copy the original one
    let currentLoc = locHelper.getSPLocalizationFileAsJSON(lang);
    if (!currentLoc) {
      currentLoc = _.cloneDeep(mainLoc);
    }

    const translatedObj = await executeLocalizationTranslation(mainLoc, currentLoc, lang);
    // Replace translated part in .ts file
    if (translatedObj) {
      locHelper.replaceTranslatedKeysInJSON(translatedObj, lang)
    }

    // Set delay to wait for Azure to execute the transation
    console.log(`Finished processing ${lang}`);
    console.log();
  }
};
run();

