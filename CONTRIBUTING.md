# ChativeWidget Development Guide

Thank you for your interest in developing ChativeWidget! Below is a detailed guide on the development process, packaging, and testing the module.

## Setting Up the Development Environment

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/botstar/@chative.io/react-native-widget.git
   cd @chative.io/react-native-widget
   ```

2. Install dependencies:
   ```
   yarn install
   ```

## Development Process

1. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/feature-name
   ```

2. Make your changes in the source code.

3. Run lint and fix any issues:
   ```
   yarn lint
   ```

4. Commit your changes:
   ```
   git commit -am "Add new feature: Brief description"
   ```

## Packaging the Module

After you've completed your changes and want to test them:

1. Update the version in `package.json` if necessary.

2. Package the module:
   ```
   yarn pack
   ```
   This will create a `.tgz` file in the root directory of the project.

## Testing with Expo Example

1. Navigate to the examples directory:
   ```
   cd examples
   ```

2. Install the new version of the module and start the example app:
   ```
   yarn livechat
   ```
   This command will perform the following steps:
   - Remove the current version of @chative.io/react-native-widget
   - Clear the yarn cache
   - Install the new version from the .tgz file

3. Run the example app with Expo:
   - To run on iOS:
     ```
     yarn ios
     ```
   - To run on Android:
     ```
     yarn android
     ```
   - To run on web:
     ```
     yarn web
     ```

4. Thoroughly test to ensure everything works as expected across different platforms.

## Submitting a Pull Request

1. Push your branch to GitHub:
   ```
   git push origin feature/feature-name
   ```

2. Create a Pull Request on GitHub from your branch to the main branch (main or master).

3. Describe your changes in detail in the Pull Request description.

4. Wait for review and feedback from maintainers.

## Important Notes

- Always test your changes on both iOS and Android before submitting a Pull Request.
- Update documentation (README.md, JSDoc, etc.) if you add or change any features.
- If you encounter any issues during development, don't hesitate to create an issue or ask in your Pull Request.

Thank you for contributing to ChativeWidget!