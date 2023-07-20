import { useEffect, useState, useRef } from "react"

export const Form=()=>{
    const [url, setUrl]=useState('');
    // const [inputText, setInputText]=useState(null)
    const [select, setSelect]=useState('status');
    const inputRef = useRef();


    const handleSubmit=async()=>{
        
        const url = inputRef.current.value;
        console.log(url);
        
        if(select==='status'){
            let res= await fetch (url);
            let data= await res.json();
            console.log(data) 
        }else if (select==='readFile'){
            let res= await fetch ('http://localhost:5000/readFile');
            let data= await res.json();
            console.log(data.data);
        }else{
            console.log(url.startsWith('https'))
        }
    }

    const handleSelect=(e)=>{
        setSelect(e.target.value)  
    }

    return (
        <div>
            <input ref={inputRef} disabled={false} type="text" placeholder="Enter Url"/>
            <select onChange={handleSelect}>
                <option value="status">Check for 200 status</option>
                <option value="ssl">SSL Certificate Verification</option>
                <option value="readFile">Content of Robert.txt</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )

}

