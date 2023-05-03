export interface Message {
  type: "USER" | "BOT" | "DEBUG";
  timestamp: number | string;
  messageText: string;
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
    console.log({ res });
    return res.json();
  }
}
