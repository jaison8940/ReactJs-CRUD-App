import React,{useState,useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import axios from "axios";
import toggleUpdate from './Crudcomponent';

function Formcomponent({toggle,data, onChange,setTableToggle}) {
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm();
    const [id,setId] = useState(-1);
    const [formData,setFormData] = useState([]);
    
    const onSubmit = (data) => {
        console.log(data);
        if(id == -1)
        {
            axios.post(`http://localhost:5000/user`,{
                "name": data.name,
                "email": data.email, 
                "contactno": data.contactno
            })
            .then(res => {
                console.log(res.data);
                onChange(toggle+1);
                reset();
                
            });
        }
        else
        {
            axios.put(`http://localhost:5000/user`,{
                "id": id,
                "name": data.name,
                "email": data.email, 
                "contactno": data.contactno
            })
            .then(res => {
                // setUserData(res);
                console.log(res.data);
      
                onChange(toggle+1);
                setTableToggle(0);
                reset();
                
            });
            
        }
        
        
        
    } 
    useEffect(() => {
        console.log("edit");
        if(data)
        {
            setId(data.id);
            setValue("name",data.name);
            setValue("email",data.email);
            setValue("contactno",data.contactno);
        }
    }, [data])
    


    return (
        
            <Form  onSubmit={handleSubmit(onSubmit)}>
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
        
    )
}

export default Formcomponent
