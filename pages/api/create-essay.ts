import { createEssay } from '../../lib/db-script'
import { NextApiRequest, NextApiResponse } from 'next'

const calculateAge = (): string => {
  const date = new Date() // TODO is there a way to abstract it out to the date as well? dnt make two greedy objects..
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  let monthDiff = 0
  const yearDiff = currentYear - 2005
  if (currentMonth > 5) {
    monthDiff = currentMonth - 5
  } else if (currentMonth > 5) {
    monthDiff = currentMonth + 5
  }
  const age = `${yearDiff} yrs, ${monthDiff} mth`
  return age
  // TODO make prettier pls, and make sure this actually works
  // formatted age - 17 yrs, 4 mth
}

const formatedDate = (): string => {
  const date = new Date()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonth = months[date.getMonth()]
  return `${currentMonth}, ${date.getFullYear()}`
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, shortTitle, content, source, extraSources, pastEssays, stringifiedTags, topicIdForAddingAnEssay } = req.body // TODO change name here too
    const essay = await createEssay(title, shortTitle, content, formatedDate(), calculateAge(), source, extraSources, pastEssays, stringifiedTags, topicIdForAddingAnEssay)
    console.log(essay)
    res.status(200).json(essay)
  } catch (e) {
    res.status(500) // TODO make more dynamic
  }
}
