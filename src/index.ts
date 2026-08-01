import { env } from "bun";
import { Hono } from "hono";
import { createDiscordClient, getSendableChannel } from "./discord";
import { buildEmbed } from "./embed";
import type { SeerrWebhookPayload } from "./types";

export const app = new Hono();

const discordClient = createDiscordClient(env.DISCORD_BOT_TOKEN);

app.post("/webhook", async (c) => {
  const auth = c.req.header("Authorization");

  if (auth !== env.WEBHOOK_SECRET) {
    return c.json({ error: "Unauthorised" }, 401);
  }

  let payload: SeerrWebhookPayload;

  try {
    payload = await c.req.json<SeerrWebhookPayload>();
  } catch {
    return c.json({ error: "Invalid." }, 400);
  }

  try {
    const channel = await getSendableChannel(
      discordClient,
      env.DISCORD_CHANNEL_ID,
    );

    if (!channel) {
      return c.json({ error: "Discord channel unavailable." }, 500);
    }

    const embed = buildEmbed(payload, env.SEERR_URL);
    await channel.send({ embeds: [embed] });

    return c.json({ success: "Success." });
  } catch {
    return c.json({ error: "Failed to send to Discord." }, 500);
  }
});

export default {
  port: env.PORT,
  fetch: app.fetch,
};
