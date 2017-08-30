import { Block, BlockT, BlockInitialT } from './block'

export const loadLevel = (n: number): Array<BlockT> | undefined =>
  levels[n - 1] && levels[n - 1].map(Block)

const levels: Array<Array<BlockInitialT>> = [
  [
    { rect: { x: 100 } },
  ],
  [
    { rect: { x: 100 } },
    { rect: { x: 250 }, hp: 2 },
  ],
]
