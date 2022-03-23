import React, { useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {  Link, useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Books(props) {
  let history=useHistory();
  const [toAddInFav, setToAddInFav] = useState(false);
  const [toAddInRec, setToAddInRec] = useState(false);


  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    
    setOpenError(false);
  };



  async function addToFav (){
    if(props.isloggedin){
      //console.log(toAddInFav);
      if(toAddInFav===false)
      {
        setToAddInFav(true);
        props.getCurrentBookData({
          "email":props.email,
          "authors":props.authors,
          //"availability":props.availability,
          "checked_out":props.checked_out,
          "cover_edition_key":props.cover_edition_key,
          "cover_id":props.cover_id,
          "edition_count":props.edition_count,
          "first_publish_year":props.first_publish_year,
          "has_fulltext":props.has_fulltext,
          "props.ia":props.ia,
          //"ia_collection":props.ia_collection,
          "key":props.cover_id+ props.email,
          "lending_edition":props.lending_edition,
          "lending_identifier":props.lending_identifier,
          "lendinglibrary":props.lendinglibrary,
          "printdisabled":props.printdisabled,
          "public_scan":props.public_scan,
          //"subject":props.subject,
          "title":props.title
        }, props.cover_id);
    
      }
      else{
        setMessage("already added in Favourite")
        setOpenError(true);
      }
    }
    else{
      setMessage("not logged in")
      setOpenError(true);
    }
  }
  function addToRec(){
    if(props.isloggedin){
      if(toAddInRec===false)
      {
        setToAddInRec(true);
        props.getCurrentRecBookData({
          "email":props.email,
          "authors":props.authors,
          //"availability":props.availability,
          "checked_out":props.checked_out,
          "cover_edition_key":props.cover_edition_key,
          "cover_id":props.cover_id,
          "edition_count":props.edition_count,
          "first_publish_year":props.first_publish_year,
          "has_fulltext":props.has_fulltext,
          "props.ia":props.ia,
          //"ia_collection":props.ia_collection,
          "key":props.cover_id + props.email,
          "lending_edition":props.lending_edition,
          "lending_identifier":props.lending_identifier,
          "lendinglibrary":props.lendinglibrary,
          "printdisabled":props.printdisabled,
          "public_scan":props.public_scan,
          //"subject":props.subject,
          "title":props.title
        }, props.cover_id);
      }
      else{
        setMessage("already added in Recommended")
        setOpenError(true);
      }
    }
    else{
      setMessage("not logged in")
      setOpenError(true);
    }
  }

  //getting book data after clicking on book image in dashboard
  let bookdata= JSON.stringify({
    "title": props.title,
    "author": props.author,
    "image": `https://covers.openlibrary.org/b/olid/${props.coverImage}-M.jpg`,
    "has_fulltext": props.has_fulltext,
    "subject":props.subject,
    "edition_count":props.edition_count,
    "key":props.bookkey
  })

  function showBookDetails(data){
    props.showBookDetails(data);
    //console.log("book"+data)
    history.push("/bookdetails");
  }


  return (

    <div className="col m-2 shadow mb-5 bg-body rounded">
      <div className="card " style={{ height: "400px" }}>
        <img src={`https://covers.openlibrary.org/b/olid/${props.coverImage}-M.jpg`} className="card-img-top" alt="..." style={{ height: "200px" }}  onClick={showBookDetails.bind(this,bookdata)}/>
        <div data-testid="card" className="card-body ">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text float-start">Author : {props.author}</p>
          </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-5" style={{/*marginRight: "1px"*/}}>
              <button data-testid="Favourite" className="btn favouriteBtn" onClick={addToFav.bind(this)} style={{backgroundColor:"#816606",color:"white"}}>favourite</button>
            </div>
            <div className="col-7">
              <button data-testid="recommend" className="btn recommendBtn" onClick={addToRec.bind(this)} style={{backgroundColor:"#816606",color:"white"}}>recommend</button>
            </div>
          </div>  
        
        </div>
        <Snackbar open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
            <Alert id="error" onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
