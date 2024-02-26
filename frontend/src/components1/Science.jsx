import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scienceData } from '../Redux/actionCreator'

export function Science() {
    const disptach=useDispatch();
    const state=useSelector(state=>state)
    console.log(state)

    useEffect(()=>{
        disptach(scienceData())
    }, [])


  return (
    <div>
        {/* {JSON.stringify(state, null , 2)} */}
      
      <h1>This is science data page</h1>
    </div>
  )
}


