import React from 'react'
import {AiFillStar} from "react-icons/ai"

const FeedbackForm = () => {
  return (
    <div>
    <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>How would you rate the overall experience?*</h3>

    <div>
      {[...Array(5).keys()].map((_,index)=>{
        index+=1
        return <button key={index} type='button'>
          <span>
            <AiFillStar/>
          </span>
        </button>
      })}
    </div>
    </div>
  )
}

export default FeedbackForm
