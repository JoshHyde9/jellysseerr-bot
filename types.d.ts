declare module "bun" {
  interface Env {
    DISCORD_BOT_TOKEN: string;
    DISCORD_CHANNEL_ID: string;
    PORT: number;
    WEBHOOK_SECRET: string;
    SEERR_URL: string;
  }
}
