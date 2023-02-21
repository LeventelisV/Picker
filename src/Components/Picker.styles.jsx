import styled from 'styled-components'

export const PickerContainer = styled.ul`
    border: 1px solid gray;
    height: ${props => props.height}px;
    display: inline-block;
    padding: 0px 20px;
    overflow: hidden;
    z-index:100;
    position: relative`

export const ElementCell = styled.div`
    height: ${props => props.height}px;
    align-items: center;
    display:flex;
    position:absolute;
    justify-content: center;
    left:50%;
    right:50%;
    z-index:100;
    top: ${props=>props.position}px`