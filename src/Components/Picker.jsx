import { getAllByAltText } from "@testing-library/dom"
import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 7}){
    const height = blockHeight * blocks
    return(
        <>
<PickerContainer height={height} >
    {data.map((element,index)=>
        <ElementCell 
            height ={blockHeight} 
            key={index}
            position={blockHeight*(index)}
            >{element}
        </ElementCell>
    )}
</PickerContainer>
        </>
    )
}