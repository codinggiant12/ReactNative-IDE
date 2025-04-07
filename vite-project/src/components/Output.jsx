import React, { useState } from 'react';
import Iphonelayout from './Iphonelayout';
import Android from './Android';

function Output({ data }) {
    const [display, setDisplay] = useState(false); // Corrected 'True' to 'true'
    const Class = "border px-6 rounded-md  text-orange-400 font-semibold text-2xl mr-10"

    const handleChange = () => {
        setDisplay(display => !display)
    }

    return (
        <>
            <div className=" w-[35%] border flex flex-col pt-3 items-center text-black ">
                {display ? <Iphonelayout data={data} /> : <Android data={data} />}
                <div className=' m-1'>
                    <button className='text-white' onClick={handleChange}>{display ? "Android" : "IOS"} </button>

                </div>
            </div>

        </>
    );
}

export default Output;

{/* <div className='flex justify-center '>
                    <button className='bg-black h-2 w-2 rounded-full mt-1'></button></div> */}
{/* <img src={Image} alt="" /> */ }


{/* <div className='h-165 w-84 border bg-cover py-20.5 px-6.5' style={{ backgroundImage: `url(${Image})` }}>
                <div className=' h-full w-full'>
                    <div ><div dangerouslySetInnerHTML={{ __html: data }} /></div>
                </div>
            </div> */}