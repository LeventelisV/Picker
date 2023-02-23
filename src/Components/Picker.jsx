import { useEffect, useRef, useState } from "react"
import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 5}){
    console.log("Picker")
    
    const listRef = useRef(null)
    const parentListRef = useRef(null)
    
    const pixelsIWantToMove = 40
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

    const moveTheListDown = () =>{
        const parentListPosition = parentListRef.current.getBoundingClientRect().top
        const listTopPosition = listRef.current.getBoundingClientRect().top -1 ;
        console.log(listTopPosition - parentListPosition , Math.abs(listTopPosition - parentListPosition))

        if(listTopPosition + pixelsIWantToMove - parentListPosition  <= middlePosition + Math.abs(displayedData[0].initialPosition)){
                listRef.current.style.transform = `translateY(${listTopPosition - parentListPosition + pixelsIWantToMove}px)`
        }
        else if((listTopPosition  - parentListPosition < middlePosition + Math.abs(displayedData[0].initialPosition))) 
        {
            const availableMovingSpace = listTopPosition - (middlePosition + Math.abs(displayedData[0].initialPosition))
            listRef.current.style.transform = `translateY(${listTopPosition - parentListPosition + availableMovingSpace}px)`
        }
    }

    const moveTheListUp = () => {
        const parentListTopPosition = parentListRef.current.getBoundingClientRect().top
        const parentListBottomPosition = parentListRef.current.getBoundingClientRect().bottom
        const listBottomPosition = listRef.current.getBoundingClientRect().bottom
        const listTopPosition = listRef.current.getBoundingClientRect().top -1 ;

        if( ((Math.abs(listTopPosition - parentListTopPosition) === (Math.abs(displayedData.slice(-1)[0].initialPosition)- middlePosition ))  &&  
        (listTopPosition - parentListTopPosition > 0)) || 
        Math.abs(listTopPosition - parentListTopPosition) < (Math.abs(displayedData.slice(-1)[0].initialPosition)- middlePosition )){
            listRef.current.style.transform = `translateY(${listTopPosition - parentListTopPosition - pixelsIWantToMove}px)`
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
<div>
<button 
    className="bg-red-500 h-20 w-40 rounded-lg mr-5"
    onClick={moveTheListUp}>moveUp
</button>
<button 
    className="bg-green-500 h-20 w-40 rounded-lg"
    onClick={moveTheListDown}>moveDown
</button>
</div>
</div>
        </>
    )
}