import './App.css';
import { Form } from './Components/Form';
import { useCallback, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import { Alert } from '@mui/material';
import { ShowData } from './Components/ShowData';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => {
    setOpen(value);
  };
  const [data, setData]=useState({
    show:false,
    key:null,
    value:null
  })
  const handleData=useCallback(data=>{
    setData(data)
  },[data]);

  return (
    <div className='flex-col w-full  mt-5'>
      <h1 className=' text-center w-full '>Test Your Link Here</h1>
      <div className="md:w-[50%] max-sm:w-[90%] md:p-5 max-sm:p-3 bg-blue-300 mx-auto shadow-md ">
          <Form handleData={handleData} handleOpen={handleOpen}/>
      </div>
      <div>
        {
          // loading?<h1  className=' text-center w-full'>Spinner</h1>:null
          <Backdrop
            sx={{ color: '#fff'}}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      </div>
      <div>
        {
          (data.show && !open )? <div className='md:w-[40%] mx-auto mt-10 max-sm:w-[90%] max-sm:p-3'><ShowData data={data} open={open} ></ShowData></div>:null
        }
      </div>
      
      
    </div>
  );
}

export default App;
