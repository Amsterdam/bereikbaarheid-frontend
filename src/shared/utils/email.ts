function getMailtoLink(recipient: string, subject: string, body: string) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export { getMailtoLink }
