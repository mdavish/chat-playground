import ChatCore, { type Message } from "../ChatCore";

async function main() {
  const chat = new ChatCore({
    apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
    botId: "red-dog-bot",
    env: "DEV",
    v: "20230101",
  });

  const testMessages: Message[] = [
    {
      type: "USER",
      timestamp: Date.now(),
      messageText: "Hello",
    },
  ];

  const res = await chat.getResponse(testMessages);
  console.log({ res });
}

main();
