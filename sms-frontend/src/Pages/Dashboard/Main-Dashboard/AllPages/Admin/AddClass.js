import React, { useState ,useEffect} from "react";
import axios from "axios";
import { ToastContainer ,toast } from "react-toastify";
import { useDispatch} from "react-redux";
import { NewClass } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../Redux/auth/action";
import './SCSS/AddClass.scss'
const notify =(text)=>toast(text)
const AddClass = () => {
  const initialState={
    name:"",
    
  }
  const [className, setClassName] = useState(initialState);
  const [allclasses,setAllClasses]=useState([])
  const dispatch =useDispatch()
  const handleInputChange = (e) => {
    setClassName({
      ...initialState,
      [e.target.name]:e.target.value
    });
  };

  const handleAddClass = (e) => {
   e.preventDefault();
   dispatch(NewClass(className)).then((error)=> notify(error?"added success" : "something went wrong"))
  };

  useEffect(()=>{
    axios.get(`${baseURL}/admin/getclasses`)
    .then((res)=>setAllClasses(res.data))
  },[handleAddClass])

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="mainContainer">
            <h3>Add Class</h3>
            <div className="inputContainer">
              <input
                type="number"
                name="name"
                value={className.name}
                onChange={handleInputChange}
                placeholder="Enter class name"
                className="inputField"
              />
              <button onClick={handleAddClass} className="addButton">
                Add
              </button>
            </div>
          </div>  

          <div className="table-container" >
            <h3>List of classes</h3>
            <Table style={{backgroundColor:"white"}} striped bordered hover className="table">
              <thead>
                <tr>
                  <th>sl no</th>
                  <th>Class</th>
                  <th>total Students</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {allclasses.length===0?<h1>no data</h1> :allclasses.map((classes,index) => ( 
                  
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{classes.name}</td>
                    <td>{classes.strength}</td>
                    <td>{""}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
