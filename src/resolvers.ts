import { PubSub } from "graphql-subscriptions";
import { v4 as uuidv4 } from "uuid";
export const pubsub = new PubSub();
export const MESSAGE_ADDED = "MESSAGE_ADDED";
const messages: any[] = [];
export const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_: any, { content }: { content: string }) => {
      const message = {
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);
      pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterableIterator([MESSAGE_ADDED]),
    },
  },
};
