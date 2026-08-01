import { Client, GatewayIntentBits, type SendableChannels } from "discord.js";

export const createDiscordClient = (token: string): Client => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once("clientReady", () => {
    console.log(`Discord bot online as ${client.user?.tag}`);
  });

  client.login(token);

  return client;
};

export const getSendableChannel = async (
  client: Client,
  channelId: string,
): Promise<SendableChannels | null> => {
  const channel = await client.channels.fetch(channelId);

  if (!channel?.isTextBased() || !channel.isSendable()) return null;

  return channel;
};
