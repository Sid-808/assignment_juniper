import { ChangeEvent, FormEvent, useState } from 'react';
import { LoadingStatus } from '../Utility/LoadingStatus';
import LoadingIndicator from '../Utility/LoadingIndicator';
import { Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ISignUpRequest from '../Model/ISignUpRequest';
import { signUp } from '../Service/AuthorizationService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Notification from '../Utility/Notification';

const SignUp=()=> {

  let stringArr:string[]=[];
  const[user,setUser]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const[email,setEmail]=useState<string>("");
  const[error,setError]=useState<Error>();
  const[notification,setNotification]=useState<boolean>(false);
  const[status,setStatus]=useState<LoadingStatus>('LOADED');
  
  const navigate = useNavigate();

  const onChangeUserInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setUser(event.currentTarget.value);
    setNotification(false);
  }

  const onChangePasswordInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeEmailInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.currentTarget.value);
    setNotification(false);
  }


  const submitHandler = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    const request:ISignUpRequest ={
      username:user,
      email:email,
      password:password,
      
    }

    console.log(request);  
    await signUp(request);
    setNotification(true)
    setUser("");
    setEmail("");
    setPassword("");
    //setNotification(false);

  }

  let el;
    switch(status){
        case 'LOADING':
            el=(
                <LoadingIndicator
                size='large'
                message='Logging In...'
                />
            );
            break;

        case 'ERROR_LOADING':
                el=(
                  <Alert variant="danger my-5">
                    {error?.message}
                  </Alert>
        
                );
                break;
                
        case 'LOADED':
          el=(
            <>
            <section>
              <div>
              {notification && 
                <Notification variant="success" message="User Registered successfully"/>
              }
                
                <Form onSubmit={submitHandler}>
                  <header className='mb-5 mt-5 ms-5'>
                    <h4 color='blue'>Enter details to register</h4>
                  </header>
                  <hr/>

                  <Form.Group as={Row} className="mt-5 mb-3 ms-5" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>User-name:</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="text" required value={user} placeholder="Tony" onChange={onChangeUserInput}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3 mb-3 ms-5" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Email:</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="email" required value={email} placeholder='Tony@domain.com' onChange={onChangeEmailInput} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3 mb-3 ms-5" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Password:</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="password" required value={password}  onChange={onChangePasswordInput} />
                    </Col>
                  </Form.Group>
                  
                  
                  <Button className='mb-5 mt-5 ms-5' type="submit" variant="outline-primary">Register</Button>
                  
                </Form>
                
              </div>
            </section>
            
            </>
          )
        };

  return(el);

}

export default SignUp;




