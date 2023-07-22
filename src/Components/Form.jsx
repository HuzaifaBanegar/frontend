import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Form = (props) => {

  const {handleData, handleOpen}= props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const url = data.url;
    const option = data.option;
    handleOpen(true)

    try {
      switch (option) {
        case 'checkStatus200':
          await checkStatus(url);
          break;
        case 'sslCertificate':
          await checkSSL(url);
          break;
        case 'robertFile':
          await checkRobert();
          break;
        default:
          invalid();
          break;
      }
    } catch (error) {
      // Handle API errors and display appropriate error messages
      if(error.response.status){
        handleData({show:true,key:error.response.data, value:false})
        handleOpen(false)
      }
    }

  };

  const checkStatus = async (url) => {
    const response = await axios.get(`http://localhost:5000/status?host=${url}`);
    
    if(response.data.data==='200'){
        // console.log(response.data);
        handleData({show:true,key:"Status 200", value:true})
        handleOpen(false)
    }else{
        console.log(response.data.data)
        handleData({show:true,key:"Request is not 200", value:false})
        handleOpen(false)
    }
  };

  const checkSSL = async (url) => {
    const response = await axios.get(`http://localhost:5000/ssl?host=${url}`);
    // console.log(response)
    if(response.data===true){
        handleData({show:true,key:"Valid SSL Certificate ", value:true})
        handleOpen(false)
    }else{
        handleData({show:true,key:"Invalid SSL Certificate ", value:false})
        handleOpen(false)
    }
    
  };

  const checkRobert = async () => {
    const response = await axios.get(`http://localhost:5000/readFile`);
    
    if (response) {
      handleData({show:true,key:"Robert.txt File available?", value:true})
      handleOpen(false)
    } else {
      handleData({show:true,key:"Robert.txt File not found?", value:false})
      handleOpen(false)
    }
  };

  const invalid=()=>{
    console.log("Wrong Path")
  }

  return (
    <form className='max-sm:text-sm' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-evenly w-full'>
        <label className='mt-2'>URL</label>
        <input className='w-[80%]'
          type="text"
          {...register('url', {
            pattern: {
              value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
              message: 'Invalid URL format',
            },
          })}
        />
        {errors.url && <span>{errors.url.message}</span>}
      </div>
      <div className='flex justify-evenly w-full'>
        <label className='mt-2 ' >Select an Option</label>
        <select className='text-black w-[60%]'{...register('option')}>
          <option value="checkStatus200">Check for a 200 Status</option>
          <option value="sslCertificate">SSL Certificate Verification</option>
          <option value="robertFile">Content of Robert.txt</option>
        </select>
      </div>
      <button className='w-[60%] bg-black text-white hover:scale-105' type="submit">Submit</button>
    </form>
  );
};
