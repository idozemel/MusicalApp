import { Chat } from "./chat";

const getChat = async () => {
  return await Chat.findOne();
};

const addMessage = async (msg: String) => {
  let chat = (await Chat.findOne()) || (await new Chat().save());
  chat?.messages.push(msg);
  await chat?.save();
};

export const chatService = {
  getChat,
  addMessage,
};
