import { useEffect, useRef, useState } from "react"
import {PickerContainer,ElementCell} from "./Picker.styles"

export default function Picker({data = [1,2,3,4,5,6,7,8,9],blockHeight = 40,blocks = 5}){
    const mainListRef = useRef(null)
    const parentRef = useRef(null)
    const parentPosition = useRef(null)
    
    // const parentPosition = null
    const height = blockHeight * blocks
    const middlePosition= blockHeight * (Math.floor(blocks/2))
    const initialSelectedElementPosition = Math.floor(data.length/2)
    const initialDisplayedData = data.map((element,index)=>{
        const position = (index - initialSelectedElementPosition)* blockHeight + middlePosition
        const selected = position === middlePosition
        return {value: element, position: position, selected: selected}
    })

    const [displayedData,setDisplayedData] = useState(initialDisplayedData)

    useEffect(()=>{
       parentPosition.current =  parentRef.current.getBoundingClientRect().top
    },[])

    const moveTheListUp = () =>{
        const currentPosition = mainListRef.current.getBoundingClientRect().top;
        mainListRef.current.style.transform = `translateY(${currentPosition - parentPosition.current +40}px)`
    }

    return(
        <>
        <div className="flex justify-between m-20 mr-full">
                {console.log(displayedData)}

<PickerContainer height={height} ref={parentRef}>
    <div ref={mainListRef}>{displayedData.map((element,index)=>{
        // console.log(index)
         return       <ElementCell 
                height ={blockHeight} 
                key={index}
                position={element.position}
                >{element.value}
            </ElementCell>
    }

    )}</div>
            {console.log(mainListRef?.current?.getBoundingClientRect().top,"mainListRef.current.getBoundingClientRect().top")}

</PickerContainer>
<button 
    className="bg-red-500 h-20 w-40 rounded-lg"
    onClick={moveTheListUp}>moveUp</button>
</div>
        </>
    )
}