import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
export const ShowData=(props)=>{
    const {data}= props;
    
    const {open}=props
    console.log(data.value, open)

    return (
        <div>
            {
                data.value? <Alert   severity="success">
                <AlertTitle>Successful</AlertTitle>
                    {`${data.key} - ${data.value}`}
                </Alert>:
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                    {`${data.key} - ${data.value}`}
                </Alert>
            
            }
           
        </div>
    )
}