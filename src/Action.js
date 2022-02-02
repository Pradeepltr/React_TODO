// Import required things
import './Action.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
function Action() {
  // datau is set data in API through 'PUT' method (using react hook useState)
  const [datau, setDatau] = useState({
    id: '',
    userId: '',
    title: ''
  })
  // message sector if data is update or not through API PUT call
  const [msg,setMsg] = useState('')
  // use useEffect to store all API value in data and intially it is empty array
  const [data, setData] = useState([]);
  // fetch All API data and set data through hooks
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => { return res.json() })
      .then((list) => {
        console.log(list)
        // setData(list)
        getData(list)
        
      })
  }, [])
  const getData=(resData)=>{
    setData(resData)
  }
//  Function for delete handle
  const deleteHandle = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',


    }).then((res) => {
      console.log(res)
    })
  }
  // function for apply PUT method
  const UpdateData = (e) => {

    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/todos/${datau.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id:datau.id,
        userId:datau.userId,
        title:datau.title
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    }).then((response) => response.json())
      .then((json) => {console.log(json)
         setMsg('Data update successfully')
      }
        
      )
      .catch((err)=>{
        setMsg('Data not updated')
      })
      
  }
  // Function for apply POST method
  const AddData=(e)=>{
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/todos',{
      method: 'POST',
      body: JSON.stringify({
       id:datau.id,
       userId:datau.userId,
       title:datau.title
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res)=>{ return res.json()})
    .then((resdata)=>{
      console.log(resdata);
      setMsg('Data Added')
      // setData(resdata)
      // getData(resdata)
    }).catch((err)=>{
      setMsg('Data not Added');
    })
  }
  // JSX return data
  return (
    <div>
      <div className='FormData' >
        <form>
         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
            <input type="txt" className="form-control" onInput={(e) => setDatau({ ...data, id: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='id' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">UserId</label>
            <input type="text" className="form-control" onInput={(e) => setDatau({ ...datau, userId: e.target.value })} id="exampleInputPassword1" placeholder='UserId' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Title</label>
            <input type="text" className="form-control" onInput={(e) => setDatau({ ...datau, title: e.target.value })} id="exampleInputPassword1" placeholder='title' />
          </div>

          <button type="submit" onClick={UpdateData} className="btn btn-primary">UPDATE</button>
           <button type="submit" onClick={AddData} className="btn btn-primary">ADD</button>
        </form>
        <h3>{msg}</h3>
      </div>

      <div className='flex'>


        {data.map((element) => {
          return (
            <div key={element.id}>
              <div className="card" Style="width: 20rem;">
                <div className="card-body">
                  <h5 className="card-title">ID : {element.id}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">UserID : {element.userId}</h6>
                  <p className="card-text">Title : {element.title}</p>
                  <button type="button" className="btn btn-danger" onClick={() => deleteHandle(element.id)} value={element.id}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
  </div>

</div>
)
}











    

export default Action;
