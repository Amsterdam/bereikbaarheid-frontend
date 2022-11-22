# Release
To release a new version, please take the following steps:

1. tag a new version:
   - determine the new version by looking at the 'Unreleased' section of the changelog
   - `git tag -a <version-number> -m 'version <version-number>' <full-commit-id>`
   - `git push origin <version-number>`
2. update changelog:
   - the current 'Unreleased' section becomes the new version.
   - create a new empty 'Unreleased' section
3. [create a Github release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
4. Move open issues from the current milestone to the upcoming milestone:
   - menu item Issues > filter on current milestone
   - Select all issues
   - Update all issues by selecting the upcoming milestone in the top-right corner
5. Close the current milestone:
   - [Find the current milestone](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/viewing-your-milestones-progress)
   - Click 'Close'
6. [Create an extra milestone](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/creating-and-editing-milestones-for-issues-and-pull-requests), so we always have at least two active milestones.
