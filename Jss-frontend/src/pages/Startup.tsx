
import {MouseEvent, useEffect, useState} from 'react';
import { Alert, Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';

import IProductItem from '../Model/IItem';
import { LoadingStatus } from '../Utility/LoadingStatus';
import LoadingIndicator from '../Utility/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import LogIn from '../Component/LogIn';
import SignUp from '../Component/SignUp';


const Startup = () => {
    
    const[item,setItem] = useState<IProductItem[]>([]);
    const[signIn,setSignIn] = useState<boolean>(false);
    const[signUp,setSignUp] = useState<boolean>(false);
    const[sign,setSign] = useState<boolean>(true);
    const[status,setStatus] = useState<LoadingStatus>('LOADING');
    const[error,setError] = useState<Error|null>(null);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            const fetchFurniture= async()=>{
                try{
                    //const data = await getFurnitureItems()
                    //setItem(data);
                    setStatus('LOADED');
                }catch(error:any){
                    setStatus('ERROR_LOADING')
                    setError(error)
                } 
            };
            fetchFurniture();
            },
            []
        )

    const logInClick = async (event:MouseEvent<HTMLLinkElement>)=>{
        setStatus('LOADING');
        setSign(false);
        setSignIn(true);
        setSignUp(false);
        setStatus('LOADED');
    }

    const signUpClick = async (event:MouseEvent<HTMLLinkElement>)=>{
        setStatus('LOADING');
        setSign(false);
        setSignIn(false);
        setSignUp(true);
        setStatus('LOADED');
    }
    
   let el;
   switch(status){
    case 'LOADING':
        el=(
            <LoadingIndicator
            size='large'
            message='Loading...'
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
        {(<Navbar bg="light" expand="lg" id='navbar' sticky='top'>
            <Container>
                <Navbar.Brand><FontAwesomeIcon icon={faFilm}/> Juniper Auth</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant='tabs' className="me-auto">
                            <Nav.Link className="d-flex" href="" id='movies-coming' onClick={logInClick}>
                                <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                    LogIn
                                </Nav.Link>
                            <Nav.Link className="d-flex" href="" id='movies-in-theaters' onClick={signUpClick}>
                                <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                    Register as User
                            </Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>)} 
        {sign && <div className='d-flex justify-content-center mt-5'>
            Project By: Siddhartha Shekhar 
            <br/>
            Project for: Juniper
            <br/>
            Project at: Mobile Programming
            <br/>
            Date: 24/06/2023
            </div>}
        {signIn && 
        <LogIn/>}
        {signUp &&
        <SignUp/>}      
        </> 
        );
    
    }
   return (el);

}
export default Startup;
