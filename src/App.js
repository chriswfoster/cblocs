import React, { useState } from 'react';
import moment from 'moment';
import './App.css';
import ListComp from './Components/ListComp';
import AddLocComp from './Components/AddLocComp';
import Axios from 'axios';

function App() {
  const [showList, setShowList] = useState(true);
  const [list, setList] = useState([])

  const getList = () => {
    Axios.get('http://localhost:3030/api/getLocations')
    .then(resp => {
      // setList(resp.data)
      // sort((a, b) => b.date - a.date)
      const today = moment(new Date());
      let sortedArr = []
      Object.keys(resp.data).forEach(ky => {
        if(today.isBefore(moment(resp.data[ky].expires, 'YYYYMMDDHHmm'))) {
          sortedArr.push(resp.data[ky])
        }
      })
      console.log("sorted arr befor sorting: ", sortedArr)
      sortedArr = sortedArr.sort((a, b)  => moment(a.expires, 'YYYYMMDDHHmm').diff(moment(today)) - moment(b.expires, 'YYYYMMDDHHmm').diff(moment(today)));
      setList(sortedArr)
      // console.log("response here: ", resp)
    })
    .catch(err => console.log("error: ", err))
  }
  return (
    <div className="App">
      <div className="flex-row-space-between border-btm w-100-vw">
        <h1 className="w-49-vw h-83" style={{margin: 0}} onClick={() => setShowList(false)}>ADD LOC</h1>
        <div className="w-3 h-83 bg-black"/>
        <h1 className="w-49-vw h-83" style={{margin: 0}} onClick={() => setShowList(true)}>LOC LIST</h1>
      </div>
      <div>
        {
          showList ? 
            <ListComp list={list} getList={getList}/> :
            <AddLocComp getList={getList}/>
        }
      </div>
    </div>
  );
}

export default App;
