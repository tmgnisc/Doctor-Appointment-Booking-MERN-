import React from 'react'

const DoctorCard = ( {doctor}) => {
    const {name, avgRating, totalRating, photo, specialization, totalPatient, hospital} = doctor 
  return (
    <div className='p-3 lg:p-5'>
<div>
    <img src={photo} alt="" />
</div>
    </div>
  )
}

export default DoctorCard
