import { z } from "zod";

export const ResponseSchema = z.object({
  meta: z.object({
    uuid: z.string(),
    errors: z.array(z.string()),
  }),
  response: z.object({
    message: z.object({
      text: z.string(),
      source: z.enum(["USER", "BOT", "DEBUG"]),
      timestamp: z.string(),
      id: z.string().optional(),
    }),
    notes: z
      .object({
        currentGoal: z.string().optional(),
        currentStepIndices: z.array(z.number()).optional(),
        queryResult: z.record(z.unknown()).optional(),
        collectedData: z.record(z.unknown()).optional(),
        goalFirstMsgIndex: z.number().optional(),
      })
      .optional(),
  }),
});

export type Response = z.infer<typeof ResponseSchema>;

export type APIReturnType = Promise<Response>;

export interface Message {
  source: "USER" | "BOT" | "DEBUG";
  timestamp: number | string;
  text: string;
}

export type Environment = "DEV" | "PROD";

export default class ChatCore {
  private baseUrls: { [key in Environment]: string } = {
    DEV: "https://liveapi-dev.yext.com/v2/accounts/me/chat/",
    PROD: "https://liveapi.yext.com/v2/accounts/me/chat/",
  };

  private apiKey: string;
  private botId: string;
  private env: Environment;
  private v: string;
  private chatUrl: string;

  constructor({
    apiKey,
    botId,
    env,
    v,
  }: {
    apiKey: string;
    botId: string;
    env?: Environment;
    v?: string;
  }) {
    this.apiKey = apiKey;
    this.botId = botId;
    this.env = env ?? "DEV";
    this.v = v ?? "20230101";
    // Follow this structure:
    // https://liveapi-dev.yext.com/v2/accounts/me/chat/red-dog-bot/message?v=20230101
    this.chatUrl = `${this.baseUrls[this.env]}${this.botId}/message?v=${
      this.v
    }`;
  }

  async getResponse(messages: Message[]) {
    console.log("Request JSON:");
    console.log({ messages });
    const res = await fetch(this.chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        messages: messages,
      }),
    });
    const json = await res.json();
    console.log("Response JSON:");
    console.log({ json });
    const parsed = ResponseSchema.parse(json);
    return parsed;
  }
}
