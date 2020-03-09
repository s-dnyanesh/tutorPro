// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCFgwRqfDcVXEfbcF7N3VB_E4MB_kHegN4",
    authDomain: "newapp-56a5e.firebaseapp.com",
    databaseURL: "https://newapp-56a5e.firebaseio.com",
    projectId: "newapp-56a5e",
    storageBucket: "newapp-56a5e.appspot.com",
    messagingSenderId: "636505759153",
    appId: "1:636505759153:web:17d95bfc0df4817801f190",
    measurementId: "G-YWFDZGSY2C"

  },
  
};
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
