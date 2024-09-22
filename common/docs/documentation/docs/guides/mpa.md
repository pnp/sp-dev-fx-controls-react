# Minimal Path to Awesome

The shortest way to prepare your local copy of the project for development and testing.

## Install prerequisites

Before you start contributing to this project, you will need Node.js. This project has been tested with the 10.x version of Node.js and the version of NPM that comes with it. You can use [Node Version Manager](https://github.com/nvm-sh/nvm) to switch between different versions of Node.js.

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

!!! warning
    As long as you have access to a SharePoint Online environment (for v2 and after), you can test the components from your machine. But to test the web part as a Teams Tab, you have to first deploy the SPFx solution (and sync it to Teams). You also have to deploy the [SharePoint Framework library for Microsoft Graph Toolkit](https://learn.microsoft.com/en-us/graph/toolkit/get-started/mgt-spfx) v2.9.0. So be sure to be at least **SharePoint Administrator**.

#### SPFx web part

The web part is called *ControlsTest* and is available for both SharePoint Online and Teams. To test it on SharePoint, go to the workbench page [https://[SHAREPOINT_SITE].sharepoint.com/_layouts/15/workbench.aspx](https://SHAREPOINT_SITE.sharepoint.com/_layouts/15/workbench.aspx) and add the web part.

To test it on Teams, once the project deployed on the tenant accordingly, add the web part as a Tab (from a team for example).

To update the host component, open the *ControlsTest* React component located in the following project's relative path: *src\webparts\controlsTest\components\ControlsTest.tsx*.

#### SPFx application customizer

This extension is called *TestApplicationCustomizer*. To test it, go to the following URL (after updating the parameters):

[https://[SHAREPOINT_SITE].sharepoint.com?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"ca9eac70-7343-4972-88d6-672d50e9cf38":{"location":"ClientSideExtension.ApplicationCustomizer"}}](https://SHAREPOINT_SITE.sharepoint.com?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"ca9eac70-7343-4972-88d6-672d50e9cf38":{"location":"ClientSideExtension.ApplicationCustomizer"}})

To update the host component, open the *TestApp* React component located in the following project's relative path: *src\extensions\testApp\TestApp.tsx*.

#### SPFx form customizer

This extension is called *TestForm*. To test it, you have to configure it first:

1. Open the *serve.json* file (located in the *config* folder)
2. Replace the `rootFolder` property (under `serveConfigurations` ==> `default` ==> `formCustomizer`), which contains a server relative URL, to target the list on which you want to test the extension

Then go to the following URL (after updating the parameters):

[https://[SHAREPOINT_SITE].sharepoint.com/_layouts/15/SPListForm.aspx?debugManifestsFile=https://localhost:4321/temp/manifests.js&loadSPFX=true&componentId=f9c6b930-8d5d-4550-bfd9-ed5f6ca443a8&PageType=8&RootFolder=[OPTIONAL_SERVER_RELATIVE_URL]/Lists/[LIST_NAME]](https://SHAREPOINT_SITE.sharepoint.com/_layouts/15/SPListForm.aspx?debugManifestsFile=https://localhost:4321/temp/manifests.js&loadSPFX=true&componentId=f9c6b930-8d5d-4550-bfd9-ed5f6ca443a8&PageType=8&RootFolder=OPTIONAL_SERVER_RELATIVE_URL/Lists/LIST_NAME)

To update the host component, open the *TestForm* React component located in the following project's relative path: *src\extensions\testForm\components\TestForm.tsx*.

### Documentation

SharePoint Framework React Controls uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at http://www.mkdocs.org/#installation.

Also, documentation uses custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/).

Once you have MkDocs installed on your machine, in the command line:

- run `cd ./docs/documentation` to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the web browser

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/guides/mpa)
