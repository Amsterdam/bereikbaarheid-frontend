/**
 * Delay synchronous code execution for a given number of milliseconds.
 */
const delay = (milliseconds: number): Promise<true> => {
  return new Promise(resolve => setTimeout(() => resolve(true), milliseconds))
}

export { delay }
export default delay
