/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  output: 'standalone',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['www.kanban.lv', 'cdn.discordapp.com', 'avatars.githubusercontent.com'],
  },
};
