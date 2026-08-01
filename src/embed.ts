import { type APIEmbedField, EmbedBuilder } from "discord.js";
import type { SeerrWebhookPayload } from "./types";

type NotificationMeta = {
  colour: number;
  label: string;
};

const NOTIFICATION_META: Record<string, NotificationMeta> = {
  MEDIA_PENDING: { colour: 0xf1c40f, label: "New Request Pending Approval" },
};

const metaFor = (type?: string | null): NotificationMeta => {
  return (
    (type && NOTIFICATION_META[type]) || {
      colour: 0x99aab5,
      label: type || "Notification",
    }
  );
};

export const buildEmbed = (
  payload: SeerrWebhookPayload,
  seerrURL?: string,
): EmbedBuilder => {
  const {
    notification_type: notificationType,
    message,
    image,
    media,
    subject,
    request,
  } = payload;

  const meta = metaFor(notificationType);

  const embed = new EmbedBuilder()
    .setColor(meta.colour)
    .setTitle(meta.label)
    .setTimestamp(new Date());

  if (subject) {
    embed.setDescription(`**${subject}**${message ? `\n${message}` : ""}`);
  } else if (message) {
    embed.setDescription(message);
  }

  if (image) {
    embed.setThumbnail(image);
  }

  const fields: APIEmbedField[] = [];

  if (request) {
    if (request.requestedBy_username) {
      fields.push({
        name: "Requested By",
        value: request.requestedBy_username,
        inline: true,
      });
    }
  }

  if (fields.length) {
    embed.addFields(fields.slice(0, 25));
  }

  if (seerrURL && media?.tmbdId && media.media_type) {
    embed.setURL(
      `${seerrURL.replace(/\/$/, "")}/${media.media_type}/${media.tmbdId}`,
    );
  }

  return embed;
};
