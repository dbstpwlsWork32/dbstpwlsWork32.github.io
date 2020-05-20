const firstMaker = (stageX: number, stageY: number): [boolean, string][][] => {
  return Array(stageX).fill(
    new Array(stageY).fill([false, ''])
  )
}

export {
  firstMaker
}