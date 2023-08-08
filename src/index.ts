import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import prepareAndStartGraphQLServer from './graphql/index';
import { serverConfig } from './config/serverConfig';
import { UserService } from './services';

const startAndPrepareServer = async () => {
  const port = Number(serverConfig.PORT) || 5000;
  const app = express();
  const userService = new UserService()
  app.use(express.json());
  app.use('/', expressMiddleware(await prepareAndStartGraphQLServer(),{context:async({req})=>{
      // @ts-ignore
      const token=req.header['x-auth-token'] as string 
      try {
       const user= userService.isAuthenticated(token);
        return {user} 
      } catch (error) {
        return {error}  
      }
  }}));

  app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
};

startAndPrepareServer();
