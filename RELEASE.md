# Release

To release a new version, please take the following steps:

1. Update the changelog:

   - Determine the new version by looking at the 'Unreleased' section of the changelog
   - The current 'Unreleased' section becomes the new version.
   - Create a new empty 'Unreleased' section

2. Increase the version in `package.json` by doing `npm version <VALID_SEMVER_STRING> --no-git-tag-version --force` where `<VALID_SEMVER_STRING>` is e.g 'patch' or 'minor'

3. Commit and push the changelog update & version increase

4. Tag a new version where `<VERSION_NUMBER>` is of format `v1.2.3`:

   - `git tag -a <VERSION_NUMBER> -m 'release: version <VERSION_NUMBER>' <full-commit-id>`
   - `git push origin <VERSION_NUMBER>`

5. [Create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

If you're working with milestones, also consider the following:

1. Move open issues from the current milestone to the upcoming milestone:

   - Menu item Issues > filter on current milestone
   - Select all issues
   - Update all issues by selecting the upcoming milestone in the top-right corner

2. Close the current milestone:

   - [Find the current milestone](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/viewing-your-milestones-progress)
   - Click 'Close'

3. [Create an extra milestone](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/creating-and-editing-milestones-for-issues-and-pull-requests), so we always have at least two active milestones.
