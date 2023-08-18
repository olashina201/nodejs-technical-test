import { NextFunction, Request, Response } from "express";

class IndexController {
  public test: string = 'hello'
  public index = (_req: Request, res: Response, next: NextFunction) => {
    console.log(this.test)
    try {
      res.status(200).json({
        msg: "Hello from App server",
        Time: new Date(),
        status: this.test,
        server: "Express + TS Server",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
