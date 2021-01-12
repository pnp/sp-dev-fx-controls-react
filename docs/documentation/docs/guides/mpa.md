# Minimal Path to Awesome

The shortest way to prepare your local copy of the project for development and testing.

## Install prerequisites

Before you start contributing to this project, you will need Node.js. This project has been tested with the 10.x version of Node.js and the version of NPM that comes with it. You can use [Node Version Manager](https://github.com/nvm-sh/nvm) to switch between different versions of Node.js.

## Get the local version of the CLI

- fork this repository
- clone your fork
- in the command line:
  - run `npm install` to restore dependencies
  - run `gulp serve` to serve your project
  - Start making your changes

### Documentation

SharePoint Framework React Controls uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at http://www.mkdocs.org/#installation.

Also, documentation uses custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/).

Once you have MkDocs installed on your machine, in the command line:

- run `cd ./docs/documentation` to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the web browser

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/guides/mpa)
