import React, {useEffect, useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CategoryWiseBookCard(props) {
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
    //console.log(props.isloggedin);
    if(props.isloggedin){
      //console.log(toAddInFav);
      if(toAddInFav==false)
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
      if(toAddInRec==false)
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
          "key":props.keys,
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

  return (
    
    <div className="col col-md-3  shadow mb-5 bg-body rounded changeInColor">
      <div className="card bookcard" style={{ height: "400px" }}>
        <img src={`https://covers.openlibrary.org/b/olid/${props.coverImage}-M.jpg`} className="card-img-top" alt="..." style={{ height: "200px" }} />
        <div className="card-body ">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text float-start" ><span>Author :</span> {props.author}</p>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-5" style={{/*marginRight: "1px"*/}}>
              <a href="#" className="btn favouriteBtn" onClick={addToFav.bind(this)} style={{backgroundColor:"#816606",color:"white"}}>favourite</a>
            </div>
            <div className="col-7">
              <a href="#" className="btn recommendBtn" onClick={addToRec.bind(this)} style={{backgroundColor:"#816606",color:"white"}}>recommend</a>
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
