# Contribution guidelines

We appreciate that you're interested in helping with moving the project forward. Before you submit your first PR, please read the following guide. We'd hate to see you work on something that someone else is already working on, something that we agreed not to do or something that doesn't match the project.

Sharing is caring!

## You have an idea for a new component

Awesome! Good ideas are invaluable for every product. Before you start hacking away, please check if there is no similar idea already listed in the [issue list](https://github.com/pnp/sp-dev-fx-controls-react/issues). If not, please create a new issue describing your idea. Once we agree on the feature scope and architecture, the feature will be ready for building. Don't hesitate to mention in the issue if you'd like to build the feature yourself.

When building a new control, try to add your control to the default provided web part so that everyone can test it out. Please also provide the documentation for your controls in the [documentation section](../).

## You have a suggestion for improving an existing component

Nothing is perfect. If you have an idea how to improve an existing command or the CLI, let us know by submitting an issue in the [issue list](https://github.com/pnp/sp-dev-fx-controls-react/issues). Some things are done for a reason, but some are not. Let's discuss what you think and see how the project could be improved for everyone.

## You've found a bug

Bugs happen. When you find a bug, please have a look at the [issue list](https://github.com/pnp/sp-dev-fx-controls-react/issues) if a similar bug has already been logged. If not, let us know what doesn't work and how we can reproduce it. If we can't reproduce your bug, we will ask you for clarification, which will only make it longer to fix it.

## Fixing typos

Typos are embarrassing! Most PR's that fix typos will be accepted immediately. In order to make it easier to review the PR, please narrow the focus instead of sending a huge PR of fixes.

## Tips

Before contributing:

- ensure that the **dev** branch on your fork is in sync with the original **sp-dev-fx-controls-react** repository

```bash
# assuming you are in the folder of your locally cloned fork....
git checkout dev

# assuming you have a remote named `upstream` pointing to the official **sp-dev-fx-controls-react** repo
git fetch upstream

# update your local dev to be a mirror of what's in the main repo
git pull --rebase upstream dev
```

- create a feature branch for your change. If you'll get stuck on an issue or merging your PR will take a while, this will allow you to have a clean dev branch that you can use for contributing other changes

```bash
git checkout -b my-contribution
```

## DO's & DON'Ts

- **DO** follow the same project and test structure as the existing project.
- **DO** include tests when adding new functionality and features. When fixing bugs, start with adding a test that highlights how the current behavior is broken.
- **DO** keep discussions focused. When a new or related topic comes up it's often better to create new issue than to side track the conversation.
- **DO NOT** submit PR's for coding style changes.
- **DO NOT** surprise us with big PR's. Instead file an issue & start a discussion so we can agree on a direction before you invest a large amount of time.
- **DO NOT** commit code you didn't write.
- **DO NOT** submit PR's that refactor existing code without a discussion first.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/guides/Contributing)
