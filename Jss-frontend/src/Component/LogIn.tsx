import { ChangeEvent, FormEvent, useState } from 'react';
import ILoginRequest from '../Model/ILogInRequest';
import { LoadingStatus } from '../Utility/LoadingStatus';
import LoadingIndicator from '../Utility/LoadingIndicator';
//import { Alert } from 'react-bootstrap';
import IJwtResponse from '../Model/IJwtResponse';
import { logIn, registerUser } from '../Service/AuthorizationService';
import { useNavigate } from 'react-router-dom';
import IAuth from '../Model/IAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Notification from '../Utility/Notification';
import { Alert, Col, Row } from 'react-bootstrap';

const LogIn=()=> {

  const defaultSignin:IJwtResponse={
    token:"",
    username:"",
    roles:[]
  }

  const inst:IAuth={
    authority:'ROLE_ADMIN'
  }
  
  const[user,setUser]=useState<string>("");
  const[passkey,setPasskey]=useState<string>("");
  const[auth, setAuth]=useState<IJwtResponse>(defaultSignin);
  const[error,setError]=useState<Error>();
  const[status,setStatus]=useState<LoadingStatus>('LOADED');
  const[fail,setFail]=useState<Boolean>(false);
  const navigate = useNavigate();

  const onChangeUserInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setUser(event.currentTarget.value);
  }

  const onChangePasswordInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setPasskey(event.currentTarget.value);
  }

  //const inst={authority: 'ROLE_ADMIN'}

  const submitHandler = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setStatus('LOADING')
    const request:ILoginRequest ={
      username:user,
      password:passkey
    }
    try{
      setStatus('LOADED')
      const data:IJwtResponse = await logIn(request);
      registerUser(data.username,"Bearer "+ data.token);
      if(data.username!=null){
        navigate("/welcome");
      } 
    }catch(error:any){
      setError(error);
      setFail(true)
    }    
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
                <Form onSubmit={submitHandler}>
                  <header className='mb-5 mt-5 ms-5'>
                    <h4 color='blue'>Enter credentials</h4>
                  </header>
                  <hr/>

                  <Form.Group as={Row} className="mt-5 mb-3 ms-5" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>User-name:</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="text" required value={user} placeholder="Tony" onChange={onChangeUserInput}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3 mb-3 ms-5" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Password:</Form.Label>
                    <Col sm={7}>
                    <Form.Control type="password" required value={passkey}  onChange={onChangePasswordInput} />
                    </Col>
                  </Form.Group>
                  
                  <Button className='mb-5 mt-5 ms-5' type="submit" variant="outline-primary">Log In</Button>
              
                </Form>
              </div>
            </section>
            
            </>
          )
        };

  return(el);

}

export default LogIn;


