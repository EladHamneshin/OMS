declare global {
    namespace Express {
      export interface Request {
        isAdmin?: boolean;
      }
    }
  }