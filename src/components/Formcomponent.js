import React,{useState,useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import axios from "axios";


function Formcomponent({toggle,data, onChange,setTableToggle}) {
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm();
    const [id,setId] = useState(-1);
    const [formData,setFormData] = useState([]);
    console.log(id);
    const onSubmit = (data) => {
        console.log(data);
        if(id == -1)
        {
            console.log('inside post');
            axios.post(`http://localhost:5000/users`,{
                "name": data.name,
                "dob": String(data.dob),
                "email": data.email, 
                "contactno": data.contactno
            })
            .then(res => {
                console.log(res.data);
                onChange(toggle+1);
                setId(-1);
                reset();
                
            });
        }
        else
        {
            console.log('inside post');
            axios.put(`http://localhost:5000/users/${id}`,{
                "name": data.name,
                "dob": data.dob,
                "email": data.email, 
                "contactno": data.contactno
            })
            .then(res => {
                // setUserData(res);
                console.log(res.data);
      
                onChange(toggle+1);
                setTableToggle(0);
                setId(-1);
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
            setValue("dob",data.dob);
            setValue("contactno",data.contactno);
        }
    }, [data])
    


    return (
        
            <Form  onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" {...register('name',
                {required: 'Name is required'})} />
                {errors.name && <Button variant="outline-danger">{errors.name.message}</Button>}
                    </Form.Group>   

                    <Form.Group controlId="formDOB">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" {...register('dob',
                {required: 'Date is required'})} />
                {errors.dob && <Button variant="outline-danger">{errors.dob.message}</Button>}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register('email',
                {required: 'Email address is required'})} />
                {errors.email && <Button variant="outline-danger">{errors.email.message}</Button>}
                    </Form.Group>

                    <Form.Group controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Enter contact number" {...register('contactno',
                {required: 'Contact is required',minLength:{
                    value: 10,
                    message: 'Should be 10 digits!'

                }})} />
                {errors.contactno && <Button variant="outline-danger">{errors.contactno.message}</Button>}

                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
        
    )
}

export default Formcomponent
