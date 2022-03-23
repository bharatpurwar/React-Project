import React, {useState} from 'react'
import "../favouriteCard/FavouriteCard.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FavouriteCard(props) {
  //for displaying snackbar
  const [openSuccess, setOpenSuccess] = useState(false);

  const remove = () => {
    console.log(props);
    props.remove(props.id);
    setOpenSuccess(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSuccess(false);

  };

  return (
    <div className="shift col m-2 shadow  bg-body p-0 rounded col-md-2 ">
      <div className="card favouritecard" style={{ height: "385px" }} >
        <img src={`https://covers.openlibrary.org/b/olid/${props.coverImage}-M.jpg`} className="card-img-top" alt="..." style={{ height: "200px" }} />
        <div className="card-body ">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text " style={{ textAlign:"left" }}><span>By : </span>{props.author}</p>         
      </div>
      <div className="card-footer">
        <div className="row">
        <div className="col-6">
          <button className="btn favButton"  onClick={remove} style={{backgroundColor:"#816606",color:"white"}}>remove</button>
        </div>
        </div>  
      </div>
    </div>
    <Snackbar open={openSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
      <Alert id="success" onClose={handleClose} severity="success">
        book deleted successfully
      </Alert>
    </Snackbar>
  </div>
  )
}
