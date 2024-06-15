/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  output: 'standalone',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'kanban.niksbirzgalis.com',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
    ],
  },
};
