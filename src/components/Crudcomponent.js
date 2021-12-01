import React,{useEffect,useState} from 'react'
import { Container,Row,Col} from 'react-bootstrap';
import Formcomponent from './Formcomponent'
import Tablecomponent from './Tablecomponent'


function Crudcomponent() {
    // const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm();
    // const [formData,setFormData] = useState([]);
    const [toggle,setToggle] = useState(0);
    const [tableToggle,setTableToggle] = useState(0);
    const [userData,setUserData] = useState([]);
    
    

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={{ span: 4, offset: tableToggle}}>
                        <Formcomponent toggle={toggle} data={userData} onChange={setToggle} setTableToggle={setTableToggle} />
                    </Col>
                    {tableToggle==0?
                    <Col>
                        <Tablecomponent toggle={toggle}  setData={setUserData} setToggle={setToggle} setTableToggle={setTableToggle}/>
                    </Col>
                    :""
                    }
                    
                </Row>            
            </Container>        
        </div>
    )
}

export default Crudcomponent;
