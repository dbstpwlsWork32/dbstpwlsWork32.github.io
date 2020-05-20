import React from 'react'
import styled from 'styled-components'

const Cell = styled.div<{ background: string, cellSize: number }>`
  background: ${props => props.background || 'none'};
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  box-sizing: border-box;
  border: 1px solid #ffffff36;
  border-radius: ${props => props.background === '' ? '3px' : 'none'}
`
const Row = styled.div`
  float: left
`
const StyledStage = styled.div<{ length: number, cellSize: number }>`
  width: ${props => props.length * props.cellSize + 'px'};
  background: #222222;
  &:after {
    content: '';
    display: block;
    clear: both
  };
`

export default class Stage extends React.PureComponent<{ stage: [boolean, string][][] }> {
  private cellSize: number = 30

  render () {
    return (
      <StyledStage length={this.props.stage.length} cellSize={this.cellSize}>
        {
          this.props.stage.map((x, xIndex) => (
            <Row key={`x-${xIndex}`}>
              {
                x.map((yItem, yIndex) => {
                  return <Cell background={yItem[1]} key={`x-${xIndex}-${yIndex}`} cellSize={this.cellSize} />
                })
              }
            </Row>
          ))
        }
      </StyledStage>
    )
  }
}
