namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_SECRET: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}