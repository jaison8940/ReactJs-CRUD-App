import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import { Form, Button, Container,Row,Col, Table } from 'react-bootstrap';
import {AiFillDelete} from "react-icons/ai";
import {MdModeEditOutline} from "react-icons/md";
import axios from "axios";
import Spinner from "./Spinner";

function Formcomponent() {
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm();
    const [formData,setFormData] = useState([]);
    const [id,setId] = useState(0);
    const [userData,setUserData] = useState([]);
    const [toggle,setToggle] = useState(0);
    const [spinnerToggle,setSpinnerToggle] = useState(0);
    const [editId,setEditId] = useState(-1);
    
    const onSubmit = (data) => {
        if(editId == -1)
        {
            setFormData(data);
            setToggle(1);
        }
        else
        {
            console.log(data);
            setFormData(data);
            setToggle(3);
        }
        
        
    } 

    const deleteItem = (id) => {
        // console.log(e.target.id);
        // console.log(id);
        // const temp = {"Id":id};
        setId(id);
        // setFormData(temp);
        setToggle(2);
    }
    
    const editItem = (index) =>{
        console.log(index);
        // const index = userData.map(e => e.Id).indexOf(id);
        // console.log(index);
        setValue("name",userData[index].name);
        setValue("email",userData[index].email);
        setValue("contactno",userData[index].contactno);
        setEditId(userData[index].id);

    }
    useEffect(() => {
        if(toggle == 0)
        {
            setSpinnerToggle(1);
            axios.get('http://localhost:5000/user')
            .then(res => {
                console.log("axios");
                console.log(res.data);
                setUserData(res.data);
                setSpinnerToggle(0);
            });
        }
        else if(toggle == 1)
        {
            setSpinnerToggle(1);
            axios.post(`http://localhost:5000/user`,{
                "name": formData.name,
                "email":formData.email, 
                "contactno": formData.contactno
            })
            .then(res => {
                // setUserData(res);
                console.log(res.data);
                
                setToggle(0);
                reset();
                setSpinnerToggle(0);
            });
            console.log("post");
            console.log(formData);
            // setFormData([]);
        }
        else if(toggle == 2)
        {
            console.log(formData);
            setSpinnerToggle(1);
            axios.delete(`http://localhost:5000/user/${id}`)
            .then(res => {
                // setUserData(res);
                console.log(res);
                
                setToggle(0);
                setSpinnerToggle(0);
               
            });

        }
        else if(toggle == 3)
        {
            setSpinnerToggle(1);
            axios.put(`http://localhost:5000/user`,{
                "id":editId,
                "name": formData.name,
                "email":formData.email, 
                "contactno": formData.contactno
            })
            .then(res => {
                // setUserData(res);
                console.log(res.data);
                setEditId(-1);
                setToggle(0);
                reset();
                setSpinnerToggle(0);
            });
        }
    },[toggle]);

    

    return (
        <div>
          <Container>
            <Row>
                <Col sm={4} >
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" {...register('name')} />
                        </Form.Group>   

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                        </Form.Group>

                        <Form.Group controlId="formContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder="Enter contact number" {...register('contactno')} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
                <Col>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
                                        <td>{userData[key].email}</td>
                                        <td>{userData[key].contactno}</td>
                                        <td id={userData[key].id} style={{color: 'green'}} onClick = {() => editItem(key)} ><MdModeEditOutline/></td>
                                        
                                        <td id={userData[key].id} style={{color: 'red'}} onClick = {() => deleteItem(userData[key].id)}><AiFillDelete/></td>
                                        
                                         
                                        
                                                                               
                                    </tr>

                                )

                            })}
                        
                        </tbody>
                    </Table>
                </Col>
            </Row>
            
            </Container>
        
        </div>
    )
}

export default Formcomponent
