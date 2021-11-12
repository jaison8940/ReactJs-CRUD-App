import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import { Form, Button, Container,Row,Col, Table } from 'react-bootstrap';
import {AiFillDelete} from "react-icons/ai";
import {MdModeEditOutline} from "react-icons/md";
function Formcomponent() {
    const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm();
    const [formData,setFormData] = useState([]);
    const [id,setId] = useState(0);
    const [userData,setUserData] = useState([]);
    const [toggle,setToggle] = useState(0);
    const [editId,setEditId] = useState(-1);
    const onSubmit = (data) => {
        if(editId == -1)
        {
            setId(id+1);
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
        const temp = {"Id":id};
        setFormData(temp);
        setToggle(2);
    }
    
    const editItem = (id) =>{
        console.log(id);
        const index = userData.map(e => e.Id).indexOf(id);
        console.log(index);
        setValue("name",userData[index].Name);
        setValue("email",userData[index].Email);
        setValue("contactno",userData[index].ContactNo);
        setEditId(id);

    }
    useEffect(() => {
        if(toggle == 0)
        {
            fetch('https://71z8dy3n5f.execute-api.us-east-1.amazonaws.com/dev/user')
            .then(res => res.json())
            .then(res => {
                // console.log(typeof(res)+" "+res);
                res.sort(function (a, b) {
                    return a.Id - b.Id;
                  });
                setUserData(res);
                console.log("called usereffect");
            });
        }
        else if(toggle == 1)
        {
            fetch(`https://71z8dy3n5f.execute-api.us-east-1.amazonaws.com/dev/user`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({"Id":id,"Name": formData.name,"Email":formData.email, "Contactno": formData.contactno})
            })
            .then(res => res.json())
            .then(res => {
                // setUserData(res);
                console.log(res);
                
                setToggle(0);
                reset();
            });
            console.log("post");
            console.log(formData);
            // setFormData([]);
        }
        else if(toggle == 2)
        {
            console.log(formData);
            fetch(`https://71z8dy3n5f.execute-api.us-east-1.amazonaws.com/dev/user`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  
                body: JSON.stringify({"Id":formData.Id})
            })
            .then(res => res.json())
            .then(res => {
                // setUserData(res);
                console.log(res);
                
                setToggle(0);
               
            });

        }
        else if(toggle == 3)
        {
            fetch(`https://71z8dy3n5f.execute-api.us-east-1.amazonaws.com/dev/user`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({"Id":editId,"Name": formData.name,"Email":formData.email, "Contactno": formData.contactno})
            })
            .then(res => res.json())
            .then(res => {
                // setUserData(res);
                console.log(res);
                setEditId(-1);
                setToggle(0);
                reset();
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
                            {userData.map((user) => {
                                var isChecked = false;
                                let color;
                                return (
                                    <tr key={user.Id}>
                                        <td>{user.Id}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.ContactNo}</td>
                                        <td id={user.Id} style={{color: 'green'}} onClick = {() => editItem(user.Id)} ><MdModeEditOutline/></td>
                                        
                                        <td id={user.Id} style={{color: 'red'}} onClick = {() => deleteItem(user.Id)}><AiFillDelete/></td>
                                        
                                         
                                        
                                                                               
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
