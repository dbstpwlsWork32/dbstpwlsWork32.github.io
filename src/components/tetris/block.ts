interface Block {
  shape: boolean[][],
  background: string
}

const blocks: Block[] = [
  // ㄱ
  {
    shape: [
      [true, true, true],
      [true, false, false],
      [false, false, false]
    ],
    background: '#186BD6'
  },
  {
    shape: [
      [true, false, false],
      [true, true, true],
      [false, false, false]
    ],
    background: '#DE651B'
  },
  // ㄱ + ㄴ
  {
    shape: [
      [false, true],
      [true, true],
      [true, false]
    ],
    background: '#ED5056'
  },
  {
    shape: [
      [true, false],
      [true, true],
      [false, true]
    ],
    background: '#4ABA54'
  },
  // ㅡ
  {
    shape: [
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ],
    background: '#68C5DB'
  },
  // ㅗ
  {
    shape: [
      [true, false, false],
      [true, true, false],
      [true, false, false]
    ],
    background: '#C57CEA'
  },
  // ㅁ
  {
    shape: [
      [true, true],
      [true, true]
    ],
    background: '#F6C643'
  }
]

const blockParser = (shape: boolean[][], standardPos: [number, number] = [0, 0]): [number, number][] => {
  let realPos: [number, number][] = []
  shape.forEach((statusItem, xIndex) => {
    statusItem.forEach((exist, yIndex) => {
      if (exist) realPos.push([xIndex + standardPos[0], standardPos[1] + yIndex])
    })
  })

  return realPos
}

interface TetrisBlock extends Block {
  pos: [number, number][]
}

const getBlock = (stageXLength: number): TetrisBlock => {
  const nowBlock = blocks[Math.floor(Math.random() * blocks.length)]

  let realPos = blockParser(nowBlock.shape)
  let maxXIndex = 0
  realPos.forEach(pos => {
    maxXIndex = Math.max(pos[0])
  })
  maxXIndex++

  const standardCenterXPos = Math.floor((stageXLength - maxXIndex) / 2)
  realPos = realPos.map(pos => [pos[0] + standardCenterXPos, pos[1]])

  return {
    ...nowBlock,
    pos: realPos
  }
}


export default getBlock
export {
  blockParser,
  getBlock
}