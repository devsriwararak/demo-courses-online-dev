// // middleware.ts
// // แก้ไขจาก code ของฉัน
// import { NextRequest, NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";

// // 2 ภาษา
// const locales = ["th", "en"];
// const defaultLocale = "th";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const pathname = url.pathname; // กำหนดค่า pathname จาก request.nextUrl

//   // 2ภาษา
//   // ตรวจสอบว่ามีภาษาใน URL หรือไม่


//   let permition = "";
//   let allowedPaths = {};

//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/admin'
//   if (pathname.startsWith("/admin")) {
//     permition = "admin";
//     allowedPaths = {
//       admin: [
//         "/admin",
//         "/admin/learning",
//         "/admin/pay",
//         "/admin/homework",
//         "/admin/question",
//         "/admin/manageebook",
//         "/admin/managereviews",
//         "/admin/manageactivity",
//         "/admin/reports",
//         "/admin/checkuser",
//       ],
//     };
//   }
//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/super'
//   if (pathname.startsWith("/super")) {
//     permition = "super";
//     allowedPaths = {
//       super: [
//         "/super",
//         "/super/test",
//         "/super/total",
//         "/super/good",
//         "/admin",
//         "/admin/learning",
//         "/admin/pay",
//         "/admin/homework",
//         "/admin/question",
//         "/admin/manageebook",
//         "/admin/managereviews",
//         "/admin/manageactivity",
//         "/admin/reports",
//         "/admin/checkuser",
//       ],
//     };
//   }
//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/user'
//   if (pathname.startsWith("/user")) {
//     permition = "user";
//     allowedPaths = {
//       user: [
//         "/user",
//         "/user/manageprofile",
//         "/user/shopcourse",
//         "/user/buycourse",
//         "/user/buycourse/:id*",
//         "/user/mycourse",
//         "/user/study",
//         "/user/study/:id*",
//         "/user/myorder",
//       ],
//     };
//   }

//   // ตรวจสอบการเข้าถึงด้วย wildcard
//   const allowed = allowedPaths[permition]?.some((allowedPath: any) => {
//     const pathPattern = new RegExp(
//       `^${allowedPath.replace(/:\w+/g, "\\w+").replace(/\*/g, ".*")}$`
//     );
//     return pathPattern.test(pathname);
//   });

//   // Redirect ถ้าไม่มีสิทธิ์เข้าถึงเส้นทางนั้น
//   if (!allowed) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }



//   // อนุญาตการเข้าถึงเส้นทางอื่นๆ
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/user/:path*",
//     "/super/:path*",
//     "/(th|en)/:path*",
//   ],
// };


//middleware.ts ใช้ได้ 

// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'th'],
//   defaultLocale: 'en'
// });

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };


// middleware.ts ที่ใช้ได้ **************************************************************

// import { NextRequest, NextResponse } from 'next/server';
// import createMiddleware from 'next-intl/middleware';

// // สร้าง Middleware สำหรับ next-intl
// const intlMiddleware = createMiddleware({
//   locales: ['en', 'th'],
//   defaultLocale: 'en',
// });

// // ตรวจสอบสิทธิ์การเข้าถึง
// type PermissionType = 'admin' | 'super' | 'user';

// const permissions: Record<PermissionType, string[]> = {
//   admin: ['/admin/:path*'],
//   super: ['/super/:path*'],
//   user: ['/user/:path*'],
// };

// // ฟังก์ชันตรวจสอบสิทธิ์
// function checkPermission(pathname: string, permition: PermissionType): boolean {
//   const allowedPaths = permissions[permition] || [];
//   return allowedPaths.some((allowedPath) => {
//     const pathPattern = new RegExp(`^${allowedPath.replace(/:\w+/g, '\\w+').replace(/\*/g, '.*')}$`);
//     return pathPattern.test(pathname);
//   });
// }

// // Middleware หลัก
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const url = request.nextUrl.clone();

//   // ถ้าผู้ใช้เข้าถึง '/' หรือ '/home' โดยไม่มี locale ให้ Redirect ไปยัง defaultLocale
//   if (pathname === '/' || pathname === '/home') {
//     return NextResponse.redirect(new URL('/th/home', request.url));
//   }

//   // ตรวจสอบสิทธิ์การเข้าถึงสำหรับ `/admin`, `/super`, `/user`
//   let permition: PermissionType | '' = '';
//   if (pathname.startsWith('/admin')) permition = 'admin';
//   else if (pathname.startsWith('/super')) permition = 'super';
//   else if (pathname.startsWith('/user')) permition = 'user';

//   // ถ้าผู้ใช้ไม่มีสิทธิ์เข้าถึงเส้นทางนั้น ให้ Redirect ไปยังหน้าแรก
//   if (permition && !checkPermission(pathname, permition)) {
//     return NextResponse.redirect(new URL('/th/home', request.url));
//   }

//   // ใช้ next-intl สำหรับการจัดการภาษา
//   if (!pathname.startsWith('/admin') && !pathname.startsWith('/super') && !pathname.startsWith('/user')) {
//     return intlMiddleware(request);
//   }

//   // ให้ Next.js จัดการเส้นทางที่เหลือ
//   return NextResponse.next();
// }

// // การตั้งค่า Matcher สำหรับ Middleware
// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/user/:path*',
//     '/super/:path*',
//     '/(th|en)/:path*',
//     '/',
//     '/home',
//   ],
// };




// middleware.ts

// import { NextRequest, NextResponse } from 'next/server';
// import createMiddleware from 'next-intl/middleware';

// const intlMiddleware = createMiddleware({
//   locales: ['en', 'th'],
//   defaultLocale: 'en',
// });

// type PermissionType = 'admin' | 'super' | 'user';

// const permissions: Record<PermissionType, string[]> = {
//   admin: ['/admin/:path*'],
//   super: ['/super/:path*'],
//   user: ['/user/:path*'],
// };

// function checkPermission(pathname: string, permission: PermissionType): boolean {
//   const allowedPaths = permissions[permission] || [];
//   return allowedPaths.some((allowedPath) => pathname.startsWith(allowedPath.replace(/:\w+/g, '')));
// }

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname === '/' || pathname === '/home') {
//     return NextResponse.redirect(new URL('/th/home', request.url));
//   }

//   const role: PermissionType | '' = pathname.startsWith('/admin')
//     ? 'admin'
//     : pathname.startsWith('/super')
//     ? 'super'
//     : pathname.startsWith('/user')
//     ? 'user'
//     : '';

//   if (role && !checkPermission(pathname, role)) {
//     return NextResponse.redirect(new URL('/th/home', request.url));
//   }

//   if (!role) {
//     return intlMiddleware(request);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/user/:path*',
//     '/super/:path*',
//     '/(th|en)/:path*',
//     '/',
//     '/home',
//   ],
// };

// middleware.ts

