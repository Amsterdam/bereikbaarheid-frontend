export { DataModal } from './DataModal'

export const getMailtoLink = (
  recipient: string,
  subject: string,
  body: string
) =>
  `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
