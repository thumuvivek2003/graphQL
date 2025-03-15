import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

async function startServer() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "users", url: "http://localhost:4001" },
        { name: "orders", url: "http://localhost:4002" },
      ],
    }),
  });

  const server = new ApolloServer({ gateway });

  // Await inside the async function
  const { url } = await startStandaloneServer(server);
  console.log(`🚀  Server ready at ${url}`);
}

// Call the async function
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
