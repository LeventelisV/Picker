import { useEffect, useRef, useState } from "react"
import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 5}){
    console.log("Picker")
    const mainListRef = useRef(null)
    const parentRef = useRef(null)
    const parentPosition = useRef(null)
    const [render,setRender] = useState(false)
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
       parentPosition.current =  parentRef.current.getBoundingClientRect().top
    },[])

    const moveTheListUp = () =>{
        let childPosition = mainListRef.current.getBoundingClientRect().top -1 ;
        console.log(childPosition,"clildPosition")
        console.log(parentPosition.current,"ParentPosition")
        console.log(middlePosition,"middlePosition")
        console.log(middlePosition - (childPosition - parentPosition.current - 1),"middlePosition - (childPosition - parentPosition.current - 1)")
        console.log(displayedData[0].initialPosition,"displayedData[0].initialPosition")
        if(childPosition + pixelsIWantToMove - parentPosition.current  <= middlePosition + Math.abs(displayedData[0].initialPosition)){
                mainListRef.current.style.transform = `translateY(${childPosition - parentPosition.current + pixelsIWantToMove}px)`
        }
        else{

        }
            // else{
            //     const availableMovingSpace =  middlePosition + Math.abs(displayedData[0].initialPosition) - childPosition;
            //     console.log(availableMovingSpace,"availableMovingSpace")
            //     console.log(middlePosition + Math.abs(displayedData[0].initialPosition),"middlePosition + Math.abs(displayedData[0].initialPosition)")
            //     console.log(childPosition,"childPosition")
            //     // mainListRef.current.style.transform = `translateY(${childPosition - parentPosition.current + availableMovingSpace}px)`
            // }
        setRender(!render)
    }

    return(
        <>
        <div className="flex justify-between m-20 mr-full">
                {/* {console.log(displayedData)} */}

<PickerContainer height={height} ref={parentRef}>{console.log(displayedData)}
    <div ref={mainListRef}>{displayedData.map((element,index)=>{
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