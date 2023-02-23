import { useEffect, useRef, useState } from "react"
import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 5}){
    console.log("Picker")
    
    const listRef = useRef(null)
    const parentListRef = useRef(null)
    
    const pixelsIWantToMove = 120
    const height = blockHeight * blocks
    const middlePosition= blockHeight * (Math.floor(blocks/2))
    const initialSelectedElementPosition = Math.floor(data.length/2)
    const initialDisplayedData = data.map((element,index)=>{
        const position = (index - initialSelectedElementPosition)* blockHeight + middlePosition
        const selected = position === middlePosition
        return {value: element, initialPosition: position, selected: selected}
    })

    const [displayedData,setDisplayedData] = useState(initialDisplayedData)

    useEffect(()=>{

    },[])

    const moveTheListUp = () =>{
        const parentListPosition = parentListRef.current.getBoundingClientRect().top
        const listPosition = listRef.current.getBoundingClientRect().top -1 ;
        if(listPosition + pixelsIWantToMove - parentListPosition  <= middlePosition + Math.abs(displayedData[0].initialPosition)){
                listRef.current.style.transform = `translateY(${listPosition - parentListPosition + pixelsIWantToMove}px)`
        }
        else if((listPosition  - parentListPosition < middlePosition + Math.abs(displayedData[0].initialPosition))) 
        {
            const availableMovingSpace = listPosition - (middlePosition + Math.abs(displayedData[0].initialPosition))
            listRef.current.style.transform = `translateY(${listPosition - parentListPosition + availableMovingSpace}px)`
        }
    }

    return(
        <>
        <div className="flex justify-between m-20 mr-full">

<PickerContainer height={height} ref={parentListRef}>
    <div ref={listRef}>{displayedData.map((element,index)=>{
         return       <ElementCell 
                height ={blockHeight} 
                key={index}
                position={element.initialPosition}
                >{element.value}
            </ElementCell>
    }

    )}</div>
</PickerContainer>
<button 
    className="bg-red-500 h-20 w-40 rounded-lg"
    onClick={moveTheListUp}>moveUp</button>
</div>
        </>
    )
}