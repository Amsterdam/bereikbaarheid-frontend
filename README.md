# Bereikbaarheid frontend

## About this project

This project is the frontend for the Bereikbaarheid (Reachability) application for the City of Amsterdam [https://bereikbaarheid.amsterdam.nl/](https://bereikbaarheid.amsterdam.nl/).

With the parameter `expertMode=true` you have more information available to you: [https://bereikbaarheid.amsterdam.nl/op-kenteken?expertMode=true](https://bereikbaarheid.amsterdam.nl/op-kenteken?expertMode=true). With this set you have more options available to you.

## Folders & files

This folder is organized as follows:

- `public`: contains static files which will be taken up with `npm run build`.
- `src`: contains the React application.
- `test`: contains test utilities. These are used in `npm run test`.
- `.env.*`: environment variables for various environments. Are set with `npm run start`
- `Dockerfile` contains configuration for the Docker environment.
- `nginx.*.conf` contains the Nginx configuration for various environments.

## Getting Started

### Requirements

- Docker
- Node Package Manager (NPM)
- Suggested global libraries and IDE extensions:
  - [Prettier](https://prettier.io/);
  - [ESLint](https://eslint.org/);
  - [EditorConfig](https://editorconfig.org/).

### To have a look around

- Make sure the API is running locally, for more info see the [backend repository](https://github.com/Amsterdam/bereikbaarheid-backend).
- Create the docker images: `make build`
- Run the docker container: `make app`
- View the app at [http://localhost:5000](http://localhost:5000)

### Development

#### In Docker

Below make target will build and run the Docker development container.

```sh
make dev
```

#### Locally on your machine

1. Install de app dependencies: `npm install`
2. Make sure the API is locally or externally available ["bereikbaarheid-backend" repository](https://github.com/Amsterdam/bereikbaarheid-backend).
3. Add the API base URL (`REACT_APP_API_ROOT`) to `.env.local`.
4. Start de frontend development server: `npm start`.

A hot-reloaded version of the front-end is available at [http://localhost:3000](http://localhost:3000).

The front-end was scaffolded with [Create React App](https://github.com/facebook/create-react-app) and adjusted to confirm with the [Amsterdam "frontend-react-template"](https://github.com/Amsterdam/frontend-react-template).

## CI/CD

On every pull request and push to the `main` branch, the application is [linted and tested](./.github/workflows/ci.yml).

## Available Scripts

In this directory, you can run:

- `npm start`: runs the app in the development mode. For more info, see 'Getting started'.
- `npm test`: launches the test runner in a non-interactive watch mode.
- `npm test:watch`: launches the test runner in an interactive watch mode.
- `npm run build`: builds the app for production to the `build` folder.
- `npm run eject`: this app is currently **not** ejected.
