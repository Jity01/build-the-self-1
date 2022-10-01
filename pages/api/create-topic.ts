import { createTopic } from '../../lib/db-script'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  try {
    const { title, shortTitle, categoryId } = req.body
    const category = await createTopic(title, shortTitle, categoryId)
    res.status(200).json(category)
  } catch (e) {
    res.status(500) // TODO make more dynamic
  }
}
