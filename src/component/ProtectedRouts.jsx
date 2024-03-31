import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

function protectedRouts({children}) {
    const token=localStorage.getItem('userToken');
    if(!token){
        toast.warn('You must sign in', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
 return <Navigate to ='/signin' replace/>
    } 

// if(children.type.name==='Products')
   
        return children;


}

export default protectedRouts