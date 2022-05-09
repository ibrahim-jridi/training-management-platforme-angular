// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API:'http://localhost:9090',
  updateUserApi:'http://localhost:9090/user',
  FAPI:'http://localhost:9090/admin/formatters',// get formatter from userDao
  // FAPI2:'http://localhost:9090/admin/Formatters',// get formatter from userDao
  FAPII:'http://localhost:9090/admin/formatterss',// get formatter from formatterDao
  TAPI:'http://localhost:9090/admin/themes',
  findFormatter:'http://localhost:9090/admin/findByUsername',
  findUser:'http://localhost:9090/findByUsername',
  addUser:'http://localhost:9090/admin/addUser',
  addUser1:'http://localhost:9090/addUser',
  formation:'http://localhost:9090/admin/formations',
  image:'http://localhost:9090/image'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
