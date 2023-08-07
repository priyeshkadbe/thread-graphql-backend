import  express  from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from "./lib/db";

const startAndPrepareServer=async()=>{
 
  const port= Number(process.env.PORT) || 5000
  
  const app = express();
 
  app.use(express.json())
  const gqlServer= new ApolloServer({
    typeDefs:`
    type Query{
      hello:String
    }
    type Mutation{
      createUser(firstName:String!,lastName:String!,password:String!,email:String!):Boolean
    }
    `,
    resolvers:{
      Query:{
        hello:()=>`hey there welcome `
      },
      Mutation:{
        createUser:async(_,{firstName,lastName,password,email} :{
          firstName:string,
          lastName:string,
          password:string,
          email:string,
        })=>{
          await prismaClient.user.create({
            data:{
              email,
              firstName,
              lastName,
              password,
              salt:"erer"
            }
          });
          return true;
        }
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
