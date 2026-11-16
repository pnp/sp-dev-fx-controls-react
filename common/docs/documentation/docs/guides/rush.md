# Contributor setup: build, test, and run with Rush

This guide covers the **v4 development branch (`v4-dev`)**. Older branches can use
a different toolchain. Both projects here use SPFx 1.24.1 and Heft, not Gulp.

## How the monorepo works

A monorepo contains several projects in one Git repository. You clone this
repository once, install dependencies once, and can change the library and its
test application together.

- `libraries/spfx-controls-react`: The published `@pnp/spfx-controls-react` library.
  Control implementations are in `src/controls`; shared services are in `src/services`.
- `apps/controls-tests`: The private `@pnp/sp-dev-fx-controls-react-tests` SPFx
  application for trying controls in a web part and customizers.
- `common/docs/documentation`: The MkDocs documentation site, including this guide.
- `common/config/rush`: Shared dependency configuration and `pnpm-lock.yaml`.
- `rush.json`: The project list and pinned Rush, pnpm, and supported Node.js versions.

[Rush](https://rushjs.io/) installs dependencies, links the projects, and runs
builds in dependency order. The test app's `workspace:*` dependency uses your
**local library**, not the published npm package. Build the library before
running the app so that its compiled output exists.

[Heft](https://heft.rushstack.io/) runs each project's compiler, linting, tests,
bundling, and SPFx packaging tasks. `npm run` below only invokes project scripts;
it does not install dependencies. There is no root `package.json`, so commands
such as `npm test` must run inside a project folder.

## Prerequisites

- Git and **Node.js 22.14.0 or later within the 22.x release line**. Use the version
  in `.nvmrc` if you have a Node version manager. The repository's `rush.json`
  range applies even if SPFx itself supports additional Node versions.
- Network access to your configured npm registry for the initial installation.
- A SharePoint Online development site and permission to edit pages for browser
  testing. You do not need a tenant just to build or run automated tests.
- Python and MkDocs only if you want to preview documentation.

You do **not** need global installations of Rush, pnpm, Heft, Gulp, or the
SharePoint generator to contribute to this existing repository. The checked-in
bootstrap scripts use the repository's pinned tools.

## First-time setup

Fork the repository on GitHub, then clone your fork. Replace `YOUR-GITHUB-USER`
with your GitHub username:

```sh
git clone --branch v4-dev https://github.com/YOUR-GITHUB-USER/sp-dev-fx-controls-react.git
cd sp-dev-fx-controls-react
git switch -c my-contribution
node --version
```

If you use nvm, run `nvm install` and `nvm use` from this folder before continuing.

Run these commands from the **repository root** (the folder containing `rush.json`):

```sh
node common/scripts/install-run-rush.js install
node common/scripts/install-run-rush.js rebuild
```

`install` restores the shared lockfile and links both projects. `rebuild` runs
each project's production build: clean, compile, lint, test, and package the SPFx
solution. Rush builds the library before the test app. Solution packages are
written under each project's `sharepoint/solution` folder.

All root-level Rush examples in this guide use the bootstrap script. If you
already have Rush installed globally, `rush <command>` is the shorter equivalent.

## Everyday builds and tests

After pulling changes or switching branches, restore dependencies again:

```sh
# Repository root
node common/scripts/install-run-rush.js install
node common/scripts/install-run-rush.js build
```

`build` skips unchanged projects using Rush's incremental tracking. For any
project it does run, the current build script still cleans, tests, and packages
that project. `rebuild` runs the build scripts even when projects are unchanged.

To build only the library:

```sh
# Repository root
node common/scripts/install-run-rush.js build --to @pnp/spfx-controls-react
```

`--to` selects a project and its dependencies. Selecting
`@pnp/sp-dev-fx-controls-react-tests` builds both projects.

For a faster check without production packaging, run the Heft test script:

```sh
# Start at the repository root
cd libraries/spfx-controls-react
npm test
```

This compiles the library and runs its configured lint/test tasks. Use `npm test`
inside `apps/controls-tests` to check the app instead; build the library first.
The library's Heft Jest configuration is `config/jest.config.json`, including
`tests/setupHeft.js`. Use the project scripts rather than invoking a separate
Jest configuration directly.

## Run the test application in SharePoint

Complete the initial workspace build first. The development server runs on
**HTTPS port 4321** and serves local bundles; it is not a standalone React site
or a local SharePoint server.

### Trust the development certificate

Run once on your machine, after installing dependencies:

```sh
# Start at the repository root
cd apps/controls-tests
node ../../common/scripts/install-run-rush-pnpm.js exec heft trust-dev-cert
```

Accept your operating system's certificate trust prompt. This uses the project's
local Heft installation through Rush's pnpm wrapper, so a global Heft installation
is unnecessary. This executes a tool; it does not install project dependencies.

### Configure your development page

In `apps/controls-tests/config/serve.json`, set `initialPage` to an existing modern
page on your development site, for example:

```json
"initialPage": "https://{tenantDomain}/sites/dev/SitePages/Controls.aspx"
```

The checked-in configuration points to the legacy hosted workbench. Prefer a
modern page for new development; see Microsoft's
[modern-page debugging guidance](https://learn.microsoft.com/sharepoint/dev/spfx/debug-modern-pages).
Keep tenant-specific changes local and do not commit them.

Set the placeholder's value in the terminal where you will start the server.
For macOS/Linux:

```sh
export SPFX_SERVE_TENANT_DOMAIN=contoso.sharepoint.com
```

For PowerShell:

```powershell
$env:SPFX_SERVE_TENANT_DOMAIN = "contoso.sharepoint.com"
```

Replace `contoso.sharepoint.com` with your development tenant's hostname, without
`https://`. Alternatively, use your full page URL in `initialPage` instead of the
placeholder.

### Start and use the app

```sh
# In apps/controls-tests
npm run start
```

`npm run serve` is an alias for the same Heft development server, not a separate
fast-serve workflow. Leave this terminal running; press Ctrl+C to stop it.

Sign in to your development site. To load local manifests on the modern page,
append these parameters to the page URL:

```text
?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/build/manifests.js
```

Accept **Load debug scripts** only for your trusted local server and allow local
network access if the browser asks. Edit the page, add **Controls Test**, and use
its property pane's **Controls** settings to enable the controls you want to try.
Some controls also need lists, term sets, or permissions in your development site.

The host React component is
`apps/controls-tests/src/webparts/controlsTest/components/ControlsTest.tsx`.
For extension-specific debug URLs, see [Minimal Path to Awesome](./mpa.md).

### Edit the library and see the result

The app's server watches the app, but do not assume it recompiles the linked
library's TypeScript. For a predictable edit/build/run loop:

1. Stop the app server.
2. Edit the control in `libraries/spfx-controls-react/src/controls`.
3. From the repository root, run
   `node common/scripts/install-run-rush.js build --to @pnp/spfx-controls-react`.
4. In `apps/controls-tests`, run `npm run start` again and refresh your debug page.

There is no need to publish, pack, or reinstall the library after a source-only
change; Rush's workspace link already points at it.

## Add or update dependencies

Use **install** for an unchanged lockfile; use **update** when intentionally
changing dependencies. Do not run `npm install`, `pnpm install`, or `yarn`
inside either project or at the repository root.

For example, to add a dependency to the library:

```sh
# Start at the repository root
cd libraries/spfx-controls-react
node ../../common/scripts/install-run-rush.js add --package example-package
```

Replace `example-package` with the actual package name; add `--dev` for a
development-only dependency. `rush add` updates the manifest and lockfile.
If you edit a `package.json` dependency manually, run:

```sh
# Repository root
node common/scripts/install-run-rush.js update
```

Review and commit the relevant `package.json` changes and
`common/config/rush/pnpm-lock.yaml` together. Do not commit generated
`node_modules` or `common/temp` files.

## Preview documentation

Documentation is separate from the Rush build. Follow the
[MkDocs setup instructions](./mpa.md#documentation), then run:

```sh
# Start at the repository root
cd common/docs/documentation
mkdocs serve
```

Open the local URL printed by MkDocs. Edit Markdown in `docs`; add a navigation
entry in `mkdocs.yml` when adding a guide or control page.

## Before submitting

For code changes, run the same workspace build used by CI:

```sh
# Repository root
node common/scripts/install-run-rush.js rebuild
```

For publishable library changes, generate a Rush change file against the v4
branch (use `upstream/v4-dev` instead if that remote points to the main repository):

```sh
node common/scripts/install-run-rush.js change --target-branch origin/v4-dev
```

Describe the user-facing change and commit the generated file under
`common/changes`. CI verifies change files against `origin/v4-dev`. Submit v4
work to **v4-dev**; older contribution instructions mentioning `dev` apply to
other development lines. Include relevant automated and browser test results
in your pull request.

## Troubleshooting

- **`rush` or `heft` is not found**: Use the bootstrap commands above. Run Rush
  commands at the repository root and project scripts inside their project.
- **Unsupported Node.js version**: Switch to Node 22 in the current terminal,
  check `node --version`, and rerun the root `install` command.
- **`Unsupported URL Type "workspace:"` or no root `package.json`**: You are
  likely running an npm install or project command in the wrong place. Restore
  dependencies with Rush from the repository root.
- **Lockfile out of date**: After pulling, check that the manifests and shared
  lockfile are from the same branch. Run `update` only for intentional dependency
  changes; do not delete the lockfile to bypass the error.
- **The app cannot resolve the library, or shows old code**: Build the library,
  then restart the app server. Workspace linking does not replace compilation.
- **The browser cannot load debug manifests**: Keep the server running, check
  `https://localhost:4321/temp/build/manifests.js`, trust the development
  certificate, and check local-network permissions. Never bypass certificate
  errors as a substitute for trusting the certificate.
- **The browser opens `{tenantDomain}` or the wrong page**: Set
  `SPFX_SERVE_TENANT_DOMAIN` in the same terminal as the server, or correct
  `initialPage` in the app's `config/serve.json`, then restart the server.
- **Port 4321 is in use**: Stop the other development server before starting this
  one, or change both the serve port and your debug manifest URL consistently.
- **Registry authentication or download errors**: Check your user-level `.npmrc`,
  registry access, and any required proxy configuration. Do not commit credentials
  or a machine-specific registry into the repository.

## Rules and Guidelines

PnPjs must not be reintroduced as a runtime or public-declaration dependency of
the controls library. Shared migrated requests use `src/services/SPRestClient.ts`;
form and taxonomy operations live in `DynamicFormService.ts` and
`SPTaxonomyService.ts`. See the [migration guide](./migrate-to-v4.md) for retry,
digest and cache behavior. Run `npm test` in the library for regression coverage,
then the root `rebuild` command for both projects. Check a packed consumer as well as workspace
linking so local development dependencies cannot hide missing public dependencies.

- **Do not install dependencies with npm, pnpm, or yarn directly**: Use Rush to install dependencies and build the workspace. The checked-in lockfile is `common/config/rush/pnpm-lock.yaml`; run `rush update` after changing dependency manifests.
- **Dependencies in `spfx-controls-react`**: The `spfx-controls-react` package should not contain direct dependencies on SPFx. Instead, use `devDependencies` and `peerDependencies`.
- **Build warnings**: Rush retains Heft's nonfatal lint warnings in successful builds; compiler, test, and packaging errors still fail the build. `npm run serve` and `npm run start` both use Heft's native development server, replacing the Gulp-dependent fast-serve helper.
- **Consumer compatibility**: The v4 library requires SPFx 1.24.1 or later (below 2.0.0) and React 18.
- **Registry configuration**: Rush respects the registry configured in your user-level `.npmrc`, including corporate mirrors. Standard registry tarball URLs are omitted from the shared lockfile while integrity hashes are retained, so the lockfile does not force other contributors to use your mirror.

For more detailed information, refer to the [Rushstack documentation](https://rushstack.io/).