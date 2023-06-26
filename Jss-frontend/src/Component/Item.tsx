import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoadingIndicator from "../Utility/LoadingIndicator";
import { LoadingStatus } from "../Utility/LoadingStatus";
import { getItem, itemDelete, saveItem, updateItem } from "../Service/AuthorizationService";
import Table from 'react-bootstrap/Table';
import IItem from '../Model/IItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Notification from '../Utility/Notification';
import { Alert, Col, Row } from 'react-bootstrap';
import IItemRequest from "../Model/IItemRequest";


const ProductLineForm = ()=>{
  const[data,setData] = useState<IItem[]>([]);
  const[edit,setEdit] = useState<boolean>(false);
  const[targetId,setTargetId]=useState<string>("");
  const[itemName, setItemName]=useState<string>("");
  const[sellPrice,setSellPrice]=useState<string>("");
  const[buyPrice,setBuyPrice]=useState<string>("");
  const[itemStatus,setItemStatus]=useState<string>("");
  //
  const[itemFormName, setItemFormName]=useState<string>("");
  const[sellFormPrice,setSellFormPrice]=useState<string>("");
  const[buyFormPrice,setBuyFormPrice]=useState<string>("");
  const[itemFormStatus,setItemFormStatus]=useState<string>("");
  //
  const[status,setStatus]=useState<LoadingStatus>('LOADING');
  const[error,setError]=useState<Error>();
  const[notification,setNotification]=useState<boolean>(false);
  const[len,setLen]=useState<number>(0);
  
  useEffect(
    ()=>{
        const fetchItemLine= async()=>{
            try{
                const data = await getItem();
                setData(data);
                
                setStatus('LOADED')
            }catch(error:any){
                setStatus('ERROR_LOADING')
                setError(error)
            }
    };
    fetchItemLine();
    },
    []
  )

  const onChangeNameInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setItemName(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeSellInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setSellPrice(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeBuyInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setBuyPrice(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeStatusInput=(event:ChangeEvent<HTMLSelectElement>)=>{
    setItemStatus(event.currentTarget.value);
    setNotification(false);
  }

  //
  const onChangeNameFormInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setItemFormName(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeSellFormInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setSellFormPrice(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeBuyFormInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setBuyFormPrice(event.currentTarget.value);
    setNotification(false);
  }

  const onChangeStatusFormInput=(event:ChangeEvent<HTMLSelectElement>)=>{
    setItemFormStatus(event.currentTarget.value);
    setNotification(false);
  }

  //

  const editClose=()=> {
    setEdit(false);
  }


  const editOpen=(event:React.MouseEvent<HTMLButtonElement>)=>{
    setTargetId(event.currentTarget.id);
    setEdit(true);
  }

  const saveEdit= async()=>{
      try{
        const request:IItemRequest={
          itemId:targetId,
          itemName:itemName,
          itemBuyingPrice:buyPrice,
          itemSellingPrice:sellPrice,
          itemStatus:itemStatus
        }
        setStatus('LOADING')
        await updateItem(request.itemId,request);
        setEdit(false);
        setStatus('LOADED')
        setData(await getItem());
        }catch(error:any){
          setStatus('ERROR_LOADING')
          setError(error)
        }
  }

  const deleteRecord=async(event:React.MouseEvent<HTMLButtonElement>)=>{
      try{
        setStatus('LOADING')
        await itemDelete(event.currentTarget.id);
        setData(await getItem());
        
        setStatus('LOADED')
      }catch(error:any){
        setStatus('ERROR_LOADING');
        setError(error);
      }
  }

  const submitHandler= async(event:FormEvent<HTMLFormElement>)=>{
    //const temp:string = (len +1) as unknown as string;
    data.forEach(element=>{
      setLen(element.itemId as unknown as number)
    })

    const temp:string = (len+1) as unknown as string;

    const requestForm:IItemRequest={
      itemId:temp,
      itemName:itemFormName,
      itemBuyingPrice:buyFormPrice,
      itemSellingPrice:sellFormPrice,
      itemStatus:itemFormStatus
    }

    try{
      setStatus('LOADING')
      await saveItem(requestForm);
      setNotification(true);
      setData(await getItem());
      setItemFormName("");
      setSellFormPrice("")
      setBuyFormPrice("")
      setItemFormStatus("")
      setStatus('LOADED')
      
    }catch(error:any){
      setStatus('ERROR_LOADING');
      setError(error);
    }


  }
    let el;
    switch(status){
        case 'LOADING':
            el=(
                <LoadingIndicator
                size='large'
                message='Refreshing Items Table...'
                />
            );
            break;

        case 'ERROR_LOADING':
                el=(
                  <Alert variant="danger my-5">
                    setError("Data mismatch")
                    {error?.message}
                  </Alert>
        
                );
                break;
                
        case 'LOADED':
          el=( 
            <>

            <section>
              <div>
              <h2 className="d-flex justify-content-center mb-4">Inventory Management System</h2>
              {notification && 
                <Notification variant="success" message="Item added successfully"/>
              }
                
                <Form onSubmit={submitHandler}>

                  <Form.Group as={Row} className='d-flex justify-content-center mb-2 mt-1 ms-5' controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Item-Name:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="itemName" type="text" required value={itemFormName}  onChange={onChangeNameFormInput}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='d-flex justify-content-center mb-2 mt-1 ms-5' controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Item Sell Price:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="sellPrice" type="text" required value={sellFormPrice} onChange={onChangeSellFormInput} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='d-flex justify-content-center mb-2 mt-1 ms-5' controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Item Buy Price:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="buyPrice" type="text" required value={buyFormPrice}  onChange={onChangeBuyFormInput} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='d-flex justify-content-center mb-2 mt-1 ms-5' controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Choose Status:</Form.Label>
                    <Col sm={7}>
                    <Form.Select id="itemStatus" required value={itemFormStatus} className="mb-3" aria-label="Default select example" onChange={onChangeStatusFormInput}>
                      <option>Choose Status</option>
                      <option value="SOLD">SOLD</option>
                      <option value="AVAILABLE">AVAILABLE</option>
                    </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group className='d-flex justify-content-evenly mb-4'>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                  </Form.Group>
                </Form>
                <hr/>
                
              </div>
            </section>
            <section  className='d-flex justify-content-center'>
            <Col sm={10}>
            <Table bordered className='mb-2 mt-1 ms-5' size="sm">
            <thead >
                <th>Item Name</th>
                <th>Item Selling Price</th>
                <th>Item Buying Price</th>
                <th>Available Status</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    data.map(item=>(
                        <tr id={item.itemId}>
                            <td>{item.itemName}</td>
                            <td>{item.itemSellingPrice}</td>
                            <td>{item.itemBuyingPrice}</td>
                            <td>{item.itemStatus}</td>
                            
                            <td>{
                                <>
                                <Button id={item.itemId} className='mb-2 mt-2 ms-2' onClick={editOpen} variant="outline-primary">Edit</Button>
                                <Button id={item.itemId}className='mb-2 mt-2 ms-2' onClick={deleteRecord} variant="outline-primary">Delete</Button>
                                </>
                                }
                            </td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </Col>
        </section>

        <Modal size="lg" show={edit} onHide={editClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit existing record</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <section>
              <div>  
                <Form>

                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Item-Name:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="itemName" type="text" required value={itemName}  onChange={onChangeNameInput}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Item Sell Price:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="sellPrice" type="text" required value={sellPrice}  onChange={onChangeSellInput} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Item Buy Price:</Form.Label>
                    <Col sm={7}>
                    <Form.Control id="buyPrice" type="text" required value={buyPrice}  onChange={onChangeBuyInput} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Choose Status:</Form.Label>
                    <Col sm={7}>
                    <Form.Select id="itemStatus" required value={itemStatus} className="mb-3" aria-label="Default select example" onChange={onChangeStatusInput}>
                      <option>Choose Status</option>
                      <option value="SOLD">SOLD</option>
                      <option value="AVAILABLE">AVAILABLE</option>
                    </Form.Select>
                    </Col>
                  </Form.Group> 
                </Form>
              </div>
            </section>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>
              Close
            </Button>
            <Button id={targetId} variant="primary" onClick={saveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        )
      };

  return(el);
}

export default ProductLineForm;


