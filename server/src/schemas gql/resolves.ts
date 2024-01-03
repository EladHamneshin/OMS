import { GraphQLError } from "graphql";
import { sendQueryToDatabase } from "../dal/userDal.js";
import { userService } from "../services/userService.js";
import { AdminUser } from "../types/admin.js";
import { validateLogin } from "../controllers/userController.js";
import { autoToken, createToken } from "../middlewares/token.js";
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  }
})

type DeleteInput = {
  user_id: string;
  token: string;
};
export const resolvers = {
  Query: {
    getAllUsers: () => userService.allUsers(),

  },
  Mutation: {
    register: async (parent: any, args: { input: AdminUser }) => {

      const newUser: AdminUser = {
        first_name: args.input.first_name,
        last_name: args.input.last_name,
        email: args.input.email,
        password: args.input.password
      };

      // Check if the user already exists
      const userExistsQuery = 'SELECT * FROM admin_users WHERE email = $1';
      const existingUser = await sendQueryToDatabase(userExistsQuery, [newUser.email]);
      if (existingUser.rows.length > 0) {
        throw new GraphQLError("User already exists", { extensions: { http: { status: 400 } } });
      }
      await userService.register(newUser);
      pubsub.publish("USER_REGISTER", {
        messagePubSub: {
          message: 
            // newUser,
            `name: ${newUser.first_name} added to us`
          
        }
      });


      return newUser
    },

    login: async (parent: any, args: { input: AdminUser }) => {

      const user = {
        email: args.input.email,
        password: args.input.password
      };

      const users = await validateLogin(user.email, user.password);

      if (!users || users.length === 0) {
        throw new GraphQLError("login failed", { extensions: { http: { status: 400 } } });
      }
      //   create token
      const token = createToken(users[0].email, users[0].is_admin);
      console.log("token", token);

      users[0].token = token

      return users[0]
    },

    deleteUser: async (parent: any, args: { input: DeleteInput }) => {
      try {
        const decodedToken = await autoToken(args.input.token);
        if (!decodedToken) {
          throw new GraphQLError("Not authorized to delete a user", { extensions: { http: { status: 403 } } });
        }
        const response = await userService.deleteUser(args.input.user_id);
        if (!response) {
          throw new GraphQLError("Failed to delete user", { extensions: { http: { status: 500 } } });
        }
        return { message: "User deleted successfully" };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new GraphQLError("An error occurred during user deletion", { extensions: { http: { status: 500 } } });
      }
    },
  },
  Subscription: {
    messagePubSub: {
      subscribe: () => {
        return pubsub.asyncIterator(["USER_REGISTER"])
      },
    }
  },
}
