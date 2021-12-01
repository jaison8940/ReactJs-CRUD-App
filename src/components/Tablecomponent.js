import React,{useState,useEffect} from 'react'
import { Table } from 'react-bootstrap';
import axios from "axios";
import {AiFillDelete} from "react-icons/ai";
import {MdModeEditOutline} from "react-icons/md";

function Tablecomponent({toggle,setData,setToggle,setTableToggle}) {

    const [userData,setUserData] = useState([]);
    
  
    // const [editId,setEditId] = useState(-1);

    useEffect(() => {
        
        console.log("table");    
        axios.get('http://localhost:5000/users')
        .then(res => {
            console.log("axios");
            console.log(res.data);
            setUserData(res.data);
            
        });
        
    },[toggle]);


    const deleteItem = (id) => {
        const deleteId = id;
        axios.delete(`http://localhost:5000/users/${deleteId}`)
            .then(res => {
                // setUserData(res);
                console.log(res);               
                setToggle(toggle+1);
            });
    }
    
    const editItem = (index) =>{
        const temp = {
            "id": userData[index].id,
            "name": userData[index].name,
            "email": userData[index].email,
            "contactno": userData[index].contactno
        }
        console.log(temp);
        setData(temp);
        setTableToggle(4);

    }
    return (
        
        <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {Object.keys(userData).map((key) => {
                        var isChecked = false;
                        let color;
                        return (

                            <tr key={userData[key].id}>
                                <td>{userData[key].id}</td>
                                <td>{userData[key].name}</td>
                                <td>{userData[key].dob}</td>
                                <td>{userData[key].email}</td>
                                <td>{userData[key].contactno}</td>
                                <td id={userData[key].id} style={{color: 'green'}} onClick = {() => editItem(key)} ><MdModeEditOutline/></td>                           
                                <td id={userData[key].id} style={{color: 'red'}} onClick = {() => deleteItem(userData[key].id)}><AiFillDelete/></td>                                                  
                            </tr>

                        )

                    })}
                
                </tbody>
            </Table>
       
    )
}

export default Tablecomponent
