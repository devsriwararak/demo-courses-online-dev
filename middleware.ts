

// middleware.ts ใช้ได้ 
// ต้องการปรับให้ แก้ไข Error Warning: Prop `lang` did not match. Server: "th" Client: "en" หน้า /app/layout.tsx

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(th|en)/:path*']
// };

// *****************************************************

// middleware.ts 

import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(th|en)/:path*']
};