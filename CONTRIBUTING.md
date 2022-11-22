# Contributing
We – the maintainers of this project and [the City of Amsterdam](https://www.amsterdam.nl) – value your input, enjoy feedback and welcome improvements to our Open Source projects.

## Problems, suggestions and questions
You don't need to change any of our code or documentation to be a contributor. Many contributors add to our software by reporting problems, suggesting changes and asking simple and difficult questions. To do this, you can create a [GitHub Issue](https://help.github.com/articles/creating-an-issue/) for this project.

### Reporting problems
If you have encountered a bug, please check if an issue already exists in the list of existing [issues](https://github.com/Amsterdam/bereikbaarheid-frontend/issues). If such an issue does not exist, you can create one [here](https://github.com/Amsterdam/bereikbaarheid-frontend/issues/new/choose). When writing the bug report, try to add a clear example that shows how to reproduce said bug.

## Documentation and code
If you want to add to the documentation or code of one of our projects you should make a Pull Request. If you never used GitHub, get up to speed with [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/).

Before making making changes to the code, we advise you to first check the list of existing [issues](https://github.com/Amsterdam/bereikbaarheid-frontend/issues) to see if an issue for the suggested changes already exists. If such an issue does not exist, you can create one [here](https://github.com/Amsterdam/bereikbaarheid-frontend/issues/new/choose). Creating an issue gives an opportunity for other developers to give tips even before you start coding.

### Code style
To keep the code clean and readable, we use:

- [`eslint`](https://eslint.org/) for linting.
- [`prettier`](https://prettier.io/) for formatting.

The configuration is located in the `package.json` file. Please configure your IDE and/or editor to make use of this config.

### Obtaining a local copy of the repository
The following cases can apply to your situation:
1. you have sufficient right to write directly to the `bereikbaarheid-frontend` repository. In that case, you can clone the repository by running the following on your command line: `git clone git@github.com:Amsterdam/bereikbaarheid-frontend.git`
2. you do **not** have rights for the `bereikbaarheid-frontend` repository. In that case, you must first [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models). Once the repository is forked, you can clone it to your local machine.

### Making sure your local copy of the repository is up-to-date
When you forked the `bereikbaarheid-frontend` repository, first [sync your fork with upstream](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Then pull the latest changes from the (forked) repository:
- switch to the `main` branch: `git checkout main`
- pull the latest changes: `git pull`

### Making the changes
Now that you have an up-to-date local copy of the `bereikbaarheid-frontend` repository on your machine, first make a feature or issue branch to start making changes.

- switch to the `main` branch: `git checkout main`
- create a feature or issue branch: `git checkout -b feature/<your-feature>` or `git checkout -b issue/<issue-number>`.
- Add your changes in commits [with a message that explains them](https://github.com/alphagov/styleguides/blob/master/git.md#commit-messages). Document choices or decisions you make in the commit message, this will enable everyone to be informed of your choices in the future.
- Done? Or would you like your changes to be reviewed? Push your feature branch to the (forked) repository: `git push origin <your-branch-name>`

While you're working...

- View changed files with `git status`
- If you are adding code, make sure it adheres to the project's code and documentation style guide. If the project uses tests, make sure to write tests that show the behaviour of the newly added or changed code. 

### Making a Pull Request
If all changes have been committed, you can push your feature branch to the (forked) repository: `git push origin <your-branch-name>`. 

Next, [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to the `main` branch of the `bereikbaarheid-frontend` repository. If you are creating a pull request from a fork, follow [this guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

It could be that your contribution can be merged immediately by a maintainer. However, usually, a new pull request needs some improvements before it can be merged. Other contributors (or helper robots) might have feedback. If this is the case the reviewing maintainer will help you improve your documentation and code.

If your documentation and code have passed human review and have passed the automated tests, it is merged.
