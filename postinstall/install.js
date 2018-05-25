#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log("INFO: Adding the required localized resource configuration to the config.json file.");

// Get the current directory
const crntDir = path.resolve(__dirname);
// Split the whole directory path
let nesting = crntDir.split("/");
// Windows split
if (nesting.length <= 1) {
  nesting = crntDir.split("\\");
}
// Check if correctly splitted
if (nesting.length > 0) {
  // Find the first node_modules folder index
  let idx = nesting.indexOf("node_modules");
  // Check if index of the folder was found
  if (idx !== -1) {
    // Slice unnecessary nodes
    const nest = nesting.slice(idx);
    if (nest && nest.length > 0) {
      const paths = nest.map(m => "..");
      // Get the path of the projects root location
      const rootDir = path.resolve(path.join(__dirname, paths.join('/')));
      const fileLoc = `${rootDir}/config/config.json`;
      // Check if config.json file exists
      if (fs.existsSync(fileLoc)) {
        // Get the config file
        const config = fs.readFileSync(fileLoc, "utf8");
        if (config && typeof config === "string") {
          const contents = JSON.parse(config);
          if (contents && contents.localizedResources && !contents.localizedResources.ControlStrings) {
            contents.localizedResources["ControlStrings"] = "node_modules/@pnp/spfx-controls-react/lib/loc/{locale}.js";
            // Update the file
            fs.writeFileSync(fileLoc, JSON.stringify(contents, null, 2));
            console.log("INFO: Localized resource added.");
          } else {
            console.warn(`WARNING: it seems something is wrong with the config.json file or the "ControlStrings" reference was already set.`);
          }
        } else {
          console.warn("WARNING: the config.json file was not correctly retrieved.");
        }
      } else {
        console.warn("WARNING: the config.json file does not exist.");
      }
    } else {
      console.warn("WARNING: something is wrong with the installation path.");
    }
  } else {
    console.warn("WARNING: something when wrong during with retrieving the project its root location.");
  }
} else {
  console.warn("WARNING: something is wrong with the installation path.");
}
