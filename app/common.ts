export const unimplemented = (message: string) => () => {
  throw new Error(`unimplemented: ${message}`)
}

export const playground = document.querySelector('canvas#playground') as HTMLCanvasElement
