import mongoose from "mongoose";

export interface IChat {
  messages: [String];
}

const chatSchema = new mongoose.Schema({
  messages: [
    {
      type: String,
    },
  ],
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
