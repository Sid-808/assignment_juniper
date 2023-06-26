import Alert from 'react-bootstrap/Alert';

type Props={
    variant:string,
    message:string
}

const Notification=({variant, message}:Props)=>{
    return(
        <Alert key={variant} variant={variant}>{message}</Alert>
    )
}

export default Notification;