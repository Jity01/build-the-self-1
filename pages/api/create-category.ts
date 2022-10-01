import { createCategory } from '../../lib/db-script'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  try {
    const { title, shortTitle, quote, sourceOfQuote } = req.body
    const category = await createCategory(title, shortTitle, quote, sourceOfQuote)
    res.status(200).json(category)
  } catch (e) {
    res.status(500) // TODO make more dynamic
  }
}
