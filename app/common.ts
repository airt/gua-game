export const unimplemented = (message: string) => () => {
  throw new Error(`unimplemented: ${message}`)
}
