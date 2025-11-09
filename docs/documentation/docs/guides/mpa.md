# Minimal Path to Awesome

The shortest way to prepare your local copy of the project for development and testing.

## Install prerequisites

Before you start contributing to this project, you will need Node.js. You can use [Node Version Manager](https://github.com/nvm-sh/nvm) or [Node Version Switcher](https://github.com/jasongin/nvs) to switch between different versions of Node.js.

As this project is based on SPFx, it aligns with the following [development compatibility matrix](https://learn.microsoft.com/sharepoint/dev/spfx/compatibility#spfx-development-environment-compatibility):

| Version | SPFx Version Supported | Node Versions Supported |
| ------- | ---------------------- | ----------------------- |
| 3.23.0  | 1.21.1                 | 22                      |
| 3.22.0  | 1.21.1                 | 22                      |
| 3.21.0  | 1.21.0                 | 22                      |
| 3.20.0  | 1.20.0                 | 18                      |
| 3.19.0  | 1.19.0                 | 18                      |
| 3.18.0  | 1.18.2                 | 16, 18                  |
| 3.17.0  | 1.18.2                 | 16, 18                  |
| 3.16.0  | 1.18.2                 | 16, 18                  |
| 3.15.0  | 1.17.1                 | 16                      |
| 3.14.0  | 1.17.1                 | 16                      |
| 3.13.0  | 1.16.1                 | 14, 16, 18              |
| 3.12.0  | 1.16.0                 | 14, 16, 18              |
| 3.11.0  | 1.15.2                 | 12, 14, 16              |
| 3.10.0  | 1.15.2                 | 12, 14, 16              |
| 3.9.0   | 1.15.0                 | 12, 14, 16              |
| 3.8.0   | 1.14.0                 | 12, 14                  |
| 3.7.0   | 1.14.0                 | 12, 14                  |
| 3.6.0   | 1.13.*                 | 12, 14                  |
| 3.5.0   | 1.13.*                 | 12, 14                  |
| 3.4.0   | 1.12.1                 | 10, 12, 14              |
| 3.3.0   | 1.12.1                 | 10, 12, 14              |
| 3.2.0   | 1.12.1                 | 10, 12, 14              |
| 3.1.0   | 1.12.1                 | 10, 12, 14              |
| 3.0.0   | 1.12                   | 10, 12                  |
| 2.9.0   | 1.11                   | 10                      |
| 2.8.0   | 1.11                   | 10                      |
| 2.7.0   | 1.11                   | 10                      |
| 2.6.0   | 1.11                   | 10                      |
| 2.5.0   | 1.11                   | 10                      |
| 2.4.0   | 1.11                   | 10                      |
| 2.3.0   | 1.11                   | 10                      |
| 2.2.0   | 1.11                   | 10                      |
| 2.1.0   | 1.11                   | 10                      |
| 2.0.0   | 1.11                   | 10                      |
| 1.20.0  | 1.10                   | 8, 10                   |
| 1.19.0  | 1.10                   | 8, 10                   |
| 1.18.0  | 1.10                   | 8, 10                   |
| 1.17.0  | 1.10                   | 8, 10                   |
| 1.16.0  | 1.10                   | 8, 10                   |
| 1.15.0  | 1.10                   | 8, 10                   |
| 1.14.0  | 1.10                   | 8, 10                   |
| 1.13.0  | 1.10                   | 8, 10                   |
| 1.12.0  | 1.10                   | 8, 10                   |
| 1.11.0  | 1.10                   | 8, 10                   |

!!! important
    Because of this SPFx dependency, SPFx projects that are using PnP React Reusable Controls have to use the exact same version. For example, if your project is using version 1.21.0 of SPFx, the version of PnP Controls has to be version 3.21.0. Otherwise, you'll have to cast SPFx objects to `any` to avoid compatibility mismatch issues.

## Get the local version of the project

- fork this repository
- clone your fork
- in the command line, run the following commands:
  - `npm install` to restore dependencies
  - `npm install -g gulp-cli` in order to run `gulp` commands (run `npm list -g gulp-cli` to check if already installed on your machine or not)
  - `gulp serve` to serve your project (or `npm run serve` if you want to use [`spfx-fast-serve`](https://github.com/s-KaiNet/spfx-fast-serve))
- Start making your changes

### Run the project locally

As this project embeds a SPFx solution, you have the ability to test all the controls on your machine.

You can also debug the controls in any supported language by running one of the following commands (for example in _french_):

- `gulp serve --locale=fr-fr`
- `npx fast-serve --locale=fr-fr` (if using `spfx-fast-serve`)

Beware that both argument and value have to be lower case. Supported locales are listed in the following project's path: `src\loc`.

!!! warning
    As long as you have access to a SharePoint Online environment (for v2 and after), you can test the components from your machine. But to test the web part as a Teams Tab, you have to first deploy the SPFx solution (and sync it to Teams). You also have to deploy the [SharePoint Framework library for Microsoft Graph Toolkit](https://learn.microsoft.com/en-us/graph/toolkit/get-started/mgt-spfx) v2.9.0. So be sure to be at least **SharePoint Administrator**.

#### SPFx web part

The web part is called _ControlsTest_ and is available for both SharePoint Online and Teams. To test it on SharePoint, go to the workbench page [https://[SHAREPOINT_SITE].sharepoint.com/_layouts/15/workbench.aspx](https://SHAREPOINT_SITE.sharepoint.com/_layouts/15/workbench.aspx) and add the web part.

To test it on Teams, once the project deployed on the tenant accordingly, add the web part as a Tab (from a team for example).

To update the host component, open the _ControlsTest_ React component located in the following project's relative path: _src\webparts\controlsTest\components\ControlsTest.tsx_.

#### SPFx application customizer

This extension is called _TestApplicationCustomizer_. To test it, go to the following URL (after updating the parameters):

[https://[SHAREPOINT_SITE].sharepoint.com?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"ca9eac70-7343-4972-88d6-672d50e9cf38":{"location":"ClientSideExtension.ApplicationCustomizer"}}](https://SHAREPOINT_SITE.sharepoint.com?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"ca9eac70-7343-4972-88d6-672d50e9cf38":{"location":"ClientSideExtension.ApplicationCustomizer"}})

To update the host component, open the _TestApp_ React component located in the following project's relative path: _src\extensions\testApp\TestApp.tsx_.

#### SPFx form customizer

This extension is called _TestForm_. To test it, you have to configure it first:

1. Open the _serve.json_ file (located in the _config_ folder)
2. Replace the `rootFolder` property (under `serveConfigurations` ==> `default` ==> `formCustomizer`), which contains a server relative URL, to target the list on which you want to test the extension

Then go to the following URL (after updating the parameters):

[https://[SHAREPOINT_SITE].sharepoint.com/_layouts/15/SPListForm.aspx?debugManifestsFile=https://localhost:4321/temp/manifests.js&loadSPFX=true&componentId=f9c6b930-8d5d-4550-bfd9-ed5f6ca443a8&PageType=8&RootFolder=[OPTIONAL_SERVER_RELATIVE_URL]/Lists/[LIST_NAME]](https://SHAREPOINT_SITE.sharepoint.com/_layouts/15/SPListForm.aspx?debugManifestsFile=https://localhost:4321/temp/manifests.js&loadSPFX=true&componentId=f9c6b930-8d5d-4550-bfd9-ed5f6ca443a8&PageType=8&RootFolder=OPTIONAL_SERVER_RELATIVE_URL/Lists/LIST_NAME)

To update the host component, open the _TestForm_ React component located in the following project's relative path: _src\extensions\testForm\components\TestForm.tsx_.

### Documentation

SharePoint Framework React Controls uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at <http://www.mkdocs.org/#installation>.

Also, documentation uses custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/). Currently, documentation is working with version 3.1.0.

Once you have MkDocs installed on your machine, in the command line:

- run `cd ./docs/documentation` to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the web browser

For documentation update, we suggest you to use IDE extensions to help you for the writing process. For example, if you're using VS Code, you can install [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) for words spelling and [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) or [learn-markdown](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-markdown) for Markdown syntax.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/guides/mpa)
