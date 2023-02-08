# template-gas-vue2-typescript

## Getting started 🚀

This project requires nodejs >= 16.14.x from [nodejs.org](https://nodejs.org/en/)


``` bash
# clone this repository
git clone git@github.bus.zalan.do:link/template-gas-vue2-typescript.git
# remove .git folder
rm -rf .git
# init your own git repository
git init
# add everything and make an initial commit
git add .
git commit -m "initial commit"
# add your own remote branch
# git remote add origin git@githus.bus.zalan.do:<my-organization>/<my-repository>.git

# optional install clasp globally
npm install -g @google/clasp

# install dependencies
npm install
```

## Setup a new google apps script project 📦

### Automatic creation (linux 🐧 and macOS 🍎 only)
```bash
npm run create
```

### Alternative: Manual creation
- create a folder named "dist"
- run `clasp create --type webapp --rootDir dist`
- move ".clasp.json" from the dist folder to the project root
- run `clasp pull` to get "appsscript.json"
- move "dist/appsscript.json" to the project root
- set the timezone to Europe/Berlin with `node scripts/appsscriptHelper.js timezone Europe/Berlin`
- set the webapp appsscript settings with `node scripts/appsscriptHelper.js webapp --access MYSELF --execute USER_DEPLOYING`
- copy "appsscript.json" back to the dist folder
- force push changes with `clasp push -f`
- open the web editor with `clasp open`

- In the AppsScript Editor rename your project
- In the AppsScript Settings enable: `Show "appsscript.json" manifest file in editor`
- *Optional* Move the project file from your drive to a team drive

```bash
# build project
npm run build
# upload changes
clasp push
# open website
clasp open --webapp
```

## Updating appsscript.json ✏️

Changes to `appsscript.json` in the project root folder will only be updated after running `npm run build` or manually coying the file to the `dist` folder.

If you make changes to the `appsscript.json` in the AppsScript web editor you might get an error when pushing changes: 
`Manifest file has been updated. Do you want to push and overwrite?`
Make sure your local file matches the remote file, otherwise your changes might be lost.

For convinience there is `scripts/appsccriptHelper.js` to change web deployment and timezone options in appsscript.json.
```bash
node scripts/appsscriptHelper.js --help
```

## Local development 🧑‍💻

```bash
# start the development server
npm run dev
```

### Mocking server commands

For local development you can mock responses from you server scripts.
The file `src/mock/index.ts` contains a `mockedMethods` record which contains your mocked server responses.

```js
myServerCommand: {
  isSuccess: true,  // true = withSuccessHandler | false = withFailureHandler
  returnValue: JSON.stringify({  // return value
    name: 'John',
    age: 36
  }),
  delay: 0,  // add delay in ms to simulate loading
},
```

Usage in vue frontend
```js
this.$google.script.run
  .withSuccessHandler((response: string) => {
    console.log(JSON.parse(response));
  })
  .withFailureHandler((error: string) => {
    console.log(error);
  })
  .myServerCommand();
```

💡 TIPP: All functions in your Appsscript backend should return json stringified data.  

## Build for production / staging

`.env` file is used for local development

`env.staging` is used with `npm run build:staging`
``` bash
# build for deploying to your staging environment
npm run build:test
```

The `.env.production` file is used with `npm run build`
``` bash
# build for deploying to the production environment
npm run build
```

⚠️ WARNING: Do not put secret keys into the dotenv files

## Recommended vscode settings 🔧

Add this to `.vscode/settings.json`

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }
}
```
