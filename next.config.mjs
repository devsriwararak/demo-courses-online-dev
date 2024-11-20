// next.config.mjs

/** @type {import('next').NextConfig} */
// 2 ภาษา
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./i18n.ts')


const nextConfig = {
    // async redirects() {
    //     return [
    //       {
    //         source: '/',
    //         destination: '/home',
    //         permanent: true,
    //       },
    //     ];
    //   },
      images: {
        domains: ['courses-online-api.devsriwararak.com'],
      },
};



export default withNextIntl(nextConfig);
