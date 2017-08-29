import { Block, BlockT, BlockInitialParamT } from './block'

export const loadLevel = (n: number): Array<BlockT> | undefined =>
  levels[n - 1] && levels[n - 1].map(Block)

export const levels: Array<Array<BlockInitialParamT>> = [
  [
    { rect: { x: 100 } },
  ],
  [
    { rect: { x: 100 } },
    { rect: { x: 250 }, hp: 2 },
  ],
]
