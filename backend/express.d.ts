import UserModel from "../user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof UserModel>;
    }
  }
}
