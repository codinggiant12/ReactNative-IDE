import React from 'react';
import { useEffect } from 'react';
function Eheader({ setType, type }) {
    // useEffect(() => {
    //     setType("Structure")
    // }, [])
    return (
        <div className="w-full mt-3">
            <div className="bg-gray-600 h-14 flex justify-between px-4 items-center">
                <div className='flex gap-8'>
                    <button
                        className={`"p-10 rounded-md  text-xl mr-10" ${type === 'Structure' ? 'text-black' : 'text-white'}`}
                        onClick={() => setType('Structure')}
                    >
                        Structure
                    </button>
                    <button
                        className={`"p-4 rounded-md  text-xl mr-10" ${type === 'js' ? 'text-black' : 'text-white'}`}
                        onClick={() => setType('js')}
                    >
                        index.js
                    </button>
                    <button
                        className={`"p-4 rounded-md  text-xl mr-10" ${type === 'css' ? 'text-black' : 'text-white'}`}
                        onClick={() => setType('css')}
                    >
                        Style.css
                    </button>
                </div>
                <button className="border px-6 rounded-md bg-black text-orange-400 font-bold text-2xl mr-10">
                    Run
                </button>
            </div>
        </div>
    );
}

export default Eheader;


// active === 'js' ? 'border-2 border-white' : 'border-2 border-transparent'