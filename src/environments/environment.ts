// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAV2NB-IEDMdupRO8JUD35dcSUnEAXmXRM',
    authDomain: 'recipemaster-5cfba.firebaseapp.com',
    databaseURL: 'https://recipemaster-5cfba.firebaseio.com',
    projectId: 'recipemaster-5cfba',
    storageBucket: 'recipemaster-5cfba.appspot.com',
    messagingSenderId: '157988483599'
  }
};
