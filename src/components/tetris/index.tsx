import React from 'react'
import Stage from './stage'
import { firstMaker } from './gameHelper'
import StyledTetris from './style/styledTetris'
import { getBlock, blockParser } from './block'

interface Tetirs {
  level: number;
  keyCode: {
    down: number;
    left: number;
    right: number;
    rotate: number;
    pastDown: number;
  };
  stage: [boolean, string][][];
  userBlock: {
    shape: boolean[][];
    background: string;
    pos: [number, number][]
  };
  gameStatus: 'gameOver' | 'play' | 'pause' | 'beforePlay';
  scoreBoard: {
    rows: number;
    score: number;
  }
}
export default class Tetris extends React.Component<{}, Tetirs> {
  private eventSetStats: {
    timerId: boolean | number;
    keyBoard: boolean;
  } = {
    keyBoard: false,
    timerId: false
  }
  private stageLength: {
    x: number,
    y: number
  } = {
    x: 10,
    y: 20
  }

  public get timerSpeed () {
    // millisecond at one y line block drop
    // 20 level === 200, 1 level === 4000
    return 4000 - 200 * (this.state.level - 1)
  }

  playSetting () {
    return {
      level: 1,
      stage: [...firstMaker(this.stageLength.x, this.stageLength.y)],
      userBlock: {
        ...getBlock(this.stageLength.x)
      },
      scoreBoard: {
        score: 0,
        rows: 0
      }
    }
  }

  // user event
  keyboardEvent (e: KeyboardEvent) {
    switch (e.keyCode) {
      case this.state.keyCode.down:
        e.preventDefault()
        this.eventControl('removeTimer')
        this.drop()
        this.eventControl('addTimer')
        break;
      case this.state.keyCode.left:
        this.move(-1)
        break;
      case this.state.keyCode.right:
        this.move(1)
        break;
      case this.state.keyCode.rotate:
        this.blockRotate()
        break;
      case this.state.keyCode.pastDown:
        const mover = this.getPastDownPos(this.state.userBlock.pos, this.state.stage)[0][1] - this.state.userBlock.pos[0][1]

        this.drop(mover)
        break
    }
  }
  timerEvent () {
    this.drop()
  }

  // block evnet
  getNextUserBlock (): false | { shape: boolean[][], background: string, pos: [number, number][] }  {
    const nextUserBlock = getBlock(this.stageLength.x)

    if (!this.canSettle(nextUserBlock.pos)) {
      return false
    }

    return nextUserBlock
  }
  canSettle (nextUserBlockPos: [number, number][]): boolean {
    for (let pos of nextUserBlockPos) {
      if (
        pos[0] < 0 ||
        pos[0] > this.stageLength.x - 1 ||
        this.state.stage[pos[0]][pos[1]][0]
      ) return false
    }

    return true
  }
  getPastDownPos (blockPos: [number, number][], stage: [boolean, string][][]): [number, number][] {
    const checkX: { [num: number]: number } = {}
    for (const pos of blockPos) {
      if (typeof checkX[pos[0]] !== 'number') checkX[pos[0]] = pos[1]
      else checkX[pos[0]] = Math.max(checkX[pos[0]], pos[1])
    }

    let canMoveYPos = this.stageLength.y
    for (const x in checkX) {
      let nowCanMoveYPos = 0
      for (let y = checkX[x]; y < this.stageLength.y - 1; y++) {
        if (stage[x][y][0]) {
          nowCanMoveYPos--
          break
        } else {
          nowCanMoveYPos++
        }
      }

      canMoveYPos = Math.min(nowCanMoveYPos, canMoveYPos)
    }

    return blockPos.map(pos => [pos[0], pos[1] + canMoveYPos])
  }
  setStageByToBeUserBlock (nextUserBlock: { background: string, pos: [number, number][], shape: boolean[][] }, nowUserBlockSettle: boolean = false) {
    let newStage = JSON.parse(JSON.stringify(this.state.stage))

    let toCheckCol: {[num: number]: boolean} = {}
    let concatVal = {}
    for (let pos of this.state.userBlock.pos) {
      const blockBg = newStage[pos[0]][pos[1]][1]
      newStage[pos[0]].splice(pos[1], 1, [nowUserBlockSettle, (nowUserBlockSettle) ? blockBg : ''])
      toCheckCol[pos[1]] = true
    }

    // if do settle, check rows
    if (nowUserBlockSettle) {
      const colList: number[] = []
      for (const rowIndex in toCheckCol) {

        let full = true
        for (const col of newStage) {
          if (!col[rowIndex][0]) {
            full = false
            break
          }
        }
        if (full) colList.push(parseInt(rowIndex))
      }
      if (colList.length) {
        const { stage, level, scoreBoard } = this.breakRowEvent(newStage, colList)
        newStage = stage
        concatVal = { level, scoreBoard }
      }
    }
    // remove prevBlock prevShadow
    // this.getPastDownPos([...this.state.userBlock.pos], newStage).forEach(pos => {
    //   newStage[pos[0]][pos[1]][1] = (nowUserBlockSettle) ? newStage[pos[0]][pos[1]][1] : ''
    // })
    // // remove prevBlock prevShadow
    // // add nextblock Shadow
    // this.getPastDownPos([...nextUserBlock.pos], newStage).forEach(pos => {
    //   newStage[pos[0]][pos[1]][1] = nextUserBlock.background + '70'
    // })
    // add nextblock Shadow

    for (let pos of nextUserBlock.pos) {
      newStage[pos[0]][pos[1]] = [false, nextUserBlock.background]
    }

    this.setState({
      stage: newStage,
      userBlock: nextUserBlock,
      ...concatVal
    }, () => {
      this.eventControl('addTimer')
      this.eventControl('addKey')
    })
  }
  drop (mover?: number) {
    let maxY = 0
    const userBlockNextPos: [number, number][] = this.state.userBlock.pos.map(pos => {
      maxY = Math.max(maxY, pos[1])
      return [pos[0], pos[1] + (mover || 1)]
    })

    if (maxY >= this.stageLength.y - 1 || !this.canSettle(userBlockNextPos)) {
      // block to be settle, if block === false gameOver
      const block = this.getNextUserBlock()
      if (block !== false) {
        this.eventControl('removeTimer')
        this.eventControl('removeKey')

        this.setStageByToBeUserBlock(
          {
            ...block
          },
          true
        )
      } else {
        this.gameControl('gameOver')
      }
    } else {
      // drop block
      this.setStageByToBeUserBlock(
        {
          ...this.state.userBlock,
          pos: userBlockNextPos
        }
      )
    }

  }
  move (mover: number) {
    const userBlockNextPos: [number, number][] = this.state.userBlock.pos.map(pos => [pos[0] + mover, pos[1]])
    if (this.canSettle(userBlockNextPos)) {
      this.setStageByToBeUserBlock(
        {
          ...this.state.userBlock,
          pos: userBlockNextPos
        }
      )
    }
  }
  blockRotate () {
    let minXPos = this.stageLength.x + 1
    let minYPos = this.stageLength.y + 1
    this.state.userBlock.pos.forEach(pos => {
      minXPos = Math.min(minXPos, pos[0])
      minYPos = Math.min(minYPos, pos[1])
    })

    let rotateShape = Array.from(new Array(this.state.userBlock.shape.length), () => new Array(this.state.userBlock.shape.length).fill(false))
    this.state.userBlock.shape.forEach((items, xIndex) => {
      items.forEach((fill, yIndex) => {
        if (fill) rotateShape[yIndex][xIndex] = true
      })
    })
    rotateShape.reverse()
    const rotatePos = blockParser(rotateShape, [minXPos, minYPos])

    if (this.canSettle(rotatePos)) {
      this.setStageByToBeUserBlock({ ...this.state.userBlock, pos: rotatePos, shape: rotateShape })
    } else {
      for (let xIndex = 0; xIndex < rotateShape.length; xIndex++) {
        let moveRotatePos: [number, number][] = rotatePos.map(pos => [pos[0] - xIndex, pos[1]])

        if (rotateShape.length >= 4) {
          moveRotatePos = moveRotatePos.map(pos => [pos[0] - 2, pos[1] - 1])
        }

        if (this.canSettle(moveRotatePos)) {
          this.setStageByToBeUserBlock({ ...this.state.userBlock, pos: moveRotatePos, shape: rotateShape })
          break
        }
      }
    }
  }
  breakRowEvent (staged: [boolean, string][][], rowIndexList: number[]): { level: number, stage: [boolean, string][][], scoreBoard: { score: number, rows: number } } {
    let copyStage = [...staged]

    for (let x = 0; x < copyStage.length; x++) {
      for (const y of rowIndexList) {
        copyStage[x].splice(y, 1)
        copyStage[x] = [[false, ''], ...copyStage[x]]
      }
    }

    const nowBreakBlocks = this.state.scoreBoard.rows + rowIndexList.length
    const level = (this.state.level >= 20) ? this.state.level : Math.floor(nowBreakBlocks / this.stageLength.y) + 1

    return {
      stage: copyStage,
      level,
      scoreBoard: {
        score: this.state.scoreBoard.score + (rowIndexList.length * 10) * 11,
        rows: nowBreakBlocks
      }
    }
  }

  constructor (props: {}) {
    super(props)

    this.keyboardEvent = this.keyboardEvent.bind(this)
    this.timerEvent = this.timerEvent.bind(this)
    this.gameButtonContoller = this.gameButtonContoller.bind(this)

    this.state = {
      keyCode: {
        down: 40,
        left: 37,
        right: 39,
        rotate: 83,
        pastDown: 68
      },
      gameStatus: 'beforePlay',
      ...this.playSetting()
    }
  }

  private eventControl (order: 'addKey' | 'removeKey' | 'addTimer' | 'removeTimer') {
    switch (order) {
      case 'addKey':
        if (!this.eventSetStats.keyBoard) {
          window.addEventListener('keydown', this.keyboardEvent)
          this.eventSetStats.keyBoard = true
        }
        break;
      case 'removeKey':
        if (this.eventSetStats.keyBoard) {
          window.removeEventListener('keydown', this.keyboardEvent)
          this.eventSetStats.keyBoard = false
        }
        break;
      case 'addTimer':
        if (typeof this.eventSetStats.timerId !== 'number') {
          this.eventSetStats.timerId = setInterval(this.timerEvent, this.timerSpeed)
        }
        break;
      case 'removeTimer':
        if (typeof this.eventSetStats.timerId === 'number') {
          clearInterval(this.eventSetStats.timerId)
          this.eventSetStats.timerId = false
        }
        break;
    }
  }
  private gameControl (order: 'gameOver' | 'play' | 'pause') {
    this.setState({ gameStatus: order })
    switch (order) {
      case 'gameOver':
      case 'pause':
        this.eventControl('removeKey')
        this.eventControl('removeTimer')
        break;
      case 'play':
        this.eventControl('addKey')
        this.eventControl('addTimer')
        break
    }
  }
  private gameButtonContoller() {
    switch (this.state.gameStatus) {
      case 'pause':
      case 'beforePlay':
      case 'gameOver':
        if (this.state.gameStatus === 'gameOver' || this.state.gameStatus === 'beforePlay') {
          if (this.state.gameStatus === 'gameOver') {
            this.setState({
              ...this.playSetting()
            }, () => {
              this.setStageByToBeUserBlock(this.state.userBlock)
            })
          } else {
            this.setStageByToBeUserBlock(this.state.userBlock)
          }
        }
        this.gameControl('play')
        break
      case 'play':
        this.gameControl('pause')
        break
    }
  }

  componentDidUpdate (prevProps: {}, prevState: Tetirs): void {
    if (prevState.level !== this.state.level) {
      this.eventControl('removeTimer')
      this.eventControl('addTimer')
    }
  }

  render () {
    return (
      <StyledTetris>
        <Stage stage={this.state.stage} />
        <aside>
          <button onClick={this.gameButtonContoller}>
            {
              this.state.gameStatus === 'play' ?
                'Pause':
              this.state.gameStatus === 'gameOver' ?
                'Replay' : 'Play'
            }
          </button>

          <p>ROWS: {this.state.scoreBoard.rows}</p>
          <p>SCORE: {this.state.scoreBoard.score}</p>
          <p>LEVEL: {this.state.level}</p>
        </aside>
      </StyledTetris>
    )
  }

  componentWillUnmount () {
    this.eventControl('removeKey')
    this.eventControl('removeTimer')
  }
}