import { createCategory } from "../../lib/db-script"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const category = await createCategory(req.body.title, req.body.shortTitle)
    res.status(200).json(category)
  } catch (e) {
    res.status(500) // TODO make more dynamic
  }
}