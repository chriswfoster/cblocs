import React, { useState } from 'react';
import Axios from 'axios';

 
const AddLocComp = (props) => {
    const [dataObj, setDataObj] = useState({
        name: '',
        x: '',
        y: '',
        hours: 0,
        minutes: 0,
        description: ''
    });

    const saveLocation = () => {
        if(dataObj.x && dataObj.y && dataObj.minutes && dataObj.name){
            Axios.post('http://192.168.1.100:3030/api/addLocation', dataObj)
            .then(resp => {
                console.log("save done!");
                setDataObj({
                    name: '',
                    x: '',
                    y: '',
                    hours: 0,
                    minutes: 0,
                    description: ''
                })
                props.getList();
            })
            .catch(err => console.error("Error saving loc: ", err))
        } else {
            alert("Finish filling out form")
        }
    }

    const stateSetter = (val, key) => {
        setDataObj({...dataObj, [key]: val})
    }

    return (
        <div className="flex-col-left">
            <span>Owner name:</span>
            <input onChange={e => stateSetter(e.target.value, 'name')} className="m-btm-15" placeholder="base owner name" />

            <span>X loc:</span>
            <input onChange={e => stateSetter(e.target.value, 'x')} className="m-btm-15" placeholder="xloc"/>

            <span>Y loc:</span>
            <input onChange={e => stateSetter(e.target.value, 'y')} className="m-btm-15" placeholder="yloc"/>

            <span>Hours:</span>
            <input type="number" onChange={e => stateSetter(e.target.value, 'hours')} className="m-btm-15" placeholder="Hours"/>

            <span>Minutes:</span>
            <input type="number" onChange={e => stateSetter(e.target.value, 'minutes')} className="m-btm-15" placeholder="Minutes"/>

            <span>Description/notes:</span>
            <input onChange={e => stateSetter(e.target.value, 'description')} className="m-btm-15" placeholder="Where in the box is it?"/>

            <button onClick={() => saveLocation()}>Save</button>
        </div>
    )
}
export default AddLocComp