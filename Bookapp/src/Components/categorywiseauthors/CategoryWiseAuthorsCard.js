import React, { useEffect, useState } from 'react'
import "../SubjectAuthor/SubjectAuthorCard.css";



export default function CategoryWiseAuthorsCard(props) {
  const [image, setImage] = useState("");
  
  useEffect(()=>{
    //console.log(props);
       //console.log(props.keys.substring(9));
       setImage(props.keys.substring(9));
     //setImage(props.key.substring(9)) ;
  })

  return (
    <div className="shift col m-2 shadow  bg-body p-0 rounded col-md-2 ">
      <div className="card authorcard" style={{ height: "385px" }} >
        <img src={`https://covers.openlibrary.org/a/olid/${image}-M.jpg`} className="card-img-top" alt="..." style={{ height: "200px" }} />
        <div className="card-body ">
          <h6 className="card-title">{props.authorname}</h6>
          <p className="card-text " style={{ textAlign:"left" }}>Birth : {props.birthdate}</p>         
      </div>
      <div className="card-footer">
       
      </div>
    </div>
  </div>
  )
}