import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 5}){
    const height = blockHeight * blocks
    const middlePosition= blockHeight * (Math.floor(blocks/2))
    const initialSelectedElementPosition = Math.floor(data.length/2)
    const initialDisplayedData = data.map((element,index)=>{
        const position = (index - initialSelectedElementPosition)* blockHeight + middlePosition
        const selected = position === middlePosition
        return {value: element, position: position, selected: selected}
    })

    return(
        <>
                {console.log(initialDisplayedData)}

<PickerContainer height={height} >
    {initialDisplayedData.map((element,index)=>{
        // console.log(index)
         return       <ElementCell 
                height ={blockHeight} 
                key={index}
                position={element.position}
                >{element.value}
            </ElementCell>
    }

    )}
</PickerContainer>
        </>
    )
}