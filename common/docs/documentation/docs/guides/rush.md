# Monorepo Management with Rushstack

This project uses [Rushstack](https://rushstack.io/) for monorepo management. Rushstack helps manage and build multiple packages within a single repository efficiently.

## Project Structure

The project is split into two main packages:
- `apps/controls-tests`: An SPFx test web part and customizers.
- `libraries/spfx-controls-react`: An SPFx controls library.

## Installation

To set up Rush on your development machine, follow these steps:

1. Install Node.js 22.14.0 or later within the Node 22 release line (see `.nvmrc`).
2. Use the repository's pinned Rush version without a global installation:
    ```sh
    node common/scripts/install-run-rush.js install
    ```

## Main Commands

Here are some of the main Rush commands you will use:

- `rush update`: Install and link dependencies for all projects in the monorepo.
    ```sh
    rush update
    ```
- `rush build`: Build all projects in the monorepo.
    ```sh
    rush build
    ```
- `rush rebuild`: Clean and build all projects in the monorepo.
    ```sh
    rush rebuild
    ```
- `rush add`: Add a new dependency to a project.
    ```sh
    rush add -p <package-name>
    ```

## Rules and Guidelines

PnPjs must not be reintroduced as a runtime or public-declaration dependency of
the controls library. Shared migrated requests use `src/services/SPRestClient.ts`;
form and taxonomy operations live in `DynamicFormService.ts` and
`SPTaxonomyService.ts`. See the [migration guide](./migrate-to-v4.md) for retry,
digest and cache behavior. Run `npm test` in the library for regression coverage,
then `rush rebuild` for both projects. Check a packed consumer as well as workspace
linking so local development dependencies cannot hide missing public dependencies.

- **Do not install dependencies with npm, pnpm, or yarn directly**: Use Rush to install dependencies and build the workspace. The checked-in lockfile is `common/config/rush/pnpm-lock.yaml`; run `rush update` after changing dependency manifests.
- **Dependencies in `spfx-controls-react`**: The `spfx-controls-react` package should not contain direct dependencies on SPFx. Instead, use `devDependencies` and `peerDependencies`.
- **Heft project commands**: Both projects use SPFx 1.23.2 and Heft, not Gulp. After building the workspace, run `npm run start` inside `apps/controls-tests` to serve the test web part and customizers. Run `npm test` inside either project for its Heft tests. Rush builds the library before the app because the app uses a `workspace:*` dependency.
- **Build warnings**: Rush retains Heft's nonfatal lint warnings in successful builds; compiler, test, and packaging errors still fail the build. `npm run serve` and `npm run start` both use Heft's native development server, replacing the Gulp-dependent fast-serve helper.
- **Consumer compatibility**: The v4 library requires SPFx 1.23.2 or later (below 2.0.0) and React 17.
- **Registry configuration**: Rush respects the registry configured in your user-level `.npmrc`, including corporate mirrors. Standard registry tarball URLs are omitted from the shared lockfile while integrity hashes are retained, so the lockfile does not force other contributors to use your mirror.

For more detailed information, refer to the [Rushstack documentation](https://rushstack.io/).