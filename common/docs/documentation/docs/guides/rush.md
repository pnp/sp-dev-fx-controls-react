# Monorepo Management with Rushstack

This project uses [Rushstack](https://rushstack.io/) for monorepo management. Rushstack helps manage and build multiple packages within a single repository efficiently.

## Project Structure

The project is split into two main packages:
- `apps/controls-test`: An SPFx test web part.
- `libraries/spfx-controls-react`: An SPFx controls library.

## Installation

To set up Rush on your development machine, follow these steps:

1. Install Node.js (check `.yo.rc` file for a Node version to install).
2. Install Rush globally by running the following command:
    ```sh
    npm install -g @microsoft/rush
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

- **Do not use npm, pnpm, or yarn directly**: Always use Rush commands to manage dependencies and build processes.
- **Dependencies in `spfx-controls-react`**: The `spfx-controls-react` package should not contain direct dependencies on SPFx. Instead, use `devDependencies` and `peerDependencies`.
- **Standard SPFx Gulp Commands**: Developers can still use standard SPFx gulp commands inside one of the two packages.

For more detailed information, refer to the [Rushstack documentation](https://rushstack.io/).