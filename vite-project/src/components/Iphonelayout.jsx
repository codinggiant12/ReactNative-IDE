import React from 'react'
import Image from "../assets/phonelayout/IOS.png"
function Iphonelayout({ data }) {
    return (
        <div className=' w-75 h-9/11  bg-cover py-20 px-6.5' style={{ backgroundImage: `url(${Image})` }}>
            <div className='  w-full  h-full'>
                <div className='scoped-container' ><div className='' dangerouslySetInnerHTML={{ __html: data }} /></div>
            </div>
        </div>
    )
}

export default Iphonelayout
