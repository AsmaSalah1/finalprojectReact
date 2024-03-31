import React, { useEffect } from 'react'

function Stars(props) {
  const {reating}=props;
  let ee=[];
  let t=[];
    const numOfStar =()=>{
        for(let i=0;i<Math.round(reating);i++){
ee[i]=0;
        
 }
 let y=5-ee.length;
 for(let i=0;i<5-ee.length;i++){
  t[i]=0;
          
   }

}
useEffect(()=>{
    // for(let i=0;i<Math.round(reating);i++){
    //     console.log("reating",reating);
    //     numOfStar;
    //      }
    //      console.log("numOfStar");
    numOfStar;
},[])
    const numOfStar2 =()=>{
      return  <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.5em" viewBox="0 0 24 24"><path fill="#e7c413" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"/></svg>
    }
    const numOfStar23 =()=>{
      return  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="#a39999" d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03z"/></svg>
    }
    return (
    <>
    {numOfStar()}

{ee.map(()=>{
    return numOfStar2()
}
)}
{t.map(()=>{
    return numOfStar23()
}
)}
    
    </>
  )
}

export default Stars