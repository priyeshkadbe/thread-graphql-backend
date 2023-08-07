import  express  from "express";
import { expressMiddleware } from '@apollo/server/express4';
import prepareAndStartGraphQLServer from "./graphql/index"

const startAndPrepareServer=async()=>{
 
  const port= Number(process.env.PORT) || 5000
  const app = express();
 
  app.use(express.json())
  app.use("/",expressMiddleware(await prepareAndStartGraphQLServer()))
  
  app.listen(port,()=>{
    console.log(`server is running at ${port}`)
  })
  
}

startAndPrepareServer();
