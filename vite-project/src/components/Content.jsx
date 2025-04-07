import React, { useState } from 'react'
import MyEditor from './MyEditor'
import Output from './Output'
import Eheader from "../others/Eheader"



function Content({ Data, reactcode }) {
    const [type, setType] = useState("Structure");


    return (
        <>
            <Eheader setType={setType} type={type} />
            <div className="h-9/10 text-white flex">
                <MyEditor data={Data} type={type} />
                <Output data={reactcode} />
            </div>
        </>
    );
}

export default Content;
