import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "get user" });
  } catch (error: any) {
    res.status(400).json({ errors: [{ msg: `recommendations.${error.message}` }] });
  }
};

export default { getUser };
