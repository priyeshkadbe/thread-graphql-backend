import  express  from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const startAndPrepareServer=async()=>{
 
  const port= Number(process.env.PORT) || 5000
  
  const app = express();
 
  app.use(express.json())
  const gqlServer= new ApolloServer({
    typeDefs:`
    type Query{
      hello:String
    }
    `,
    resolvers:{
      Query:{
        hello:()=>`hey there welcome `
      }
    },
  })
  
  await gqlServer.start()
  
  app.use("/",expressMiddleware(gqlServer))
  
  app.listen(port,()=>{
    console.log(`server is running at ${port}`)
  })
  
}

startAndPrepareServer();
