import { type Request, type Response } from "express";
import usersServices from "@Services/users";
import translate from "@Dictionary";

export default async function showController(req: Request, res: Response) {
  try {
    const email = req.query.email as string;

    const { message, status, data } = await usersServices.showService(email);

    return res.status(status).json({ data, message });
  } catch (error) {
    res.status(500).json({ message: translate({ id: "server-error" }) });
  }
}
