import React from 'react'
import { useState, useEffect } from "react"
import Books from '../books/Books';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CategoryWiseBookCard from './CategoryWiseBookCard';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CategoryWiseBooks(props) {

  //setting state for showing data of books of different subjects
  const [bookdata, setbookdata] = useState([]);
 
  //getting width and height of window to make site responsive
 
  //setting state for getting current favourite and recommend
  const [allFavourite, setAllFavourite] = useState([]);
  const [allRecommend, setAllRecommend] = useState([]);

  //for displaying snackbar
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  //getting current fav book data to add to favourite
  const getCurrentBookData = async (data1, data2) => {
    saveFavourite(data1, data2);
  }
  
  //getting current rec book data to add to recommend
  const getCurrentRecBookData = async (data1, data2) => {
    saveRecommend(data1, data2);
  }

  //getting current fav data
  useEffect(()=>{
    //console.log(props);
    //console.log("props is" + props.isloggedin);
    fetch("http://localhost:3002/favourites")
    .then(data => data.json())
    .then(data => {
      var currentUserFav = data.filter((favBook)=> favBook.email == props.email);
      setAllFavourite([...currentUserFav]);
    })
  },[])

  //getting current rec data
  useEffect(()=>{
    fetch("http://localhost:3002/recommend")
    .then(data => data.json())
    .then(data => {
      var currentUserFav = data.filter((favBook)=> favBook.email == props.email);
      setAllRecommend([...currentUserFav]);
    })
  },[])

  //utility function to get updated favourite data
  const getAllFavourite = async() => {
    await fetch("http://localhost:3002/favourites")
    .then(data => data.json())
    .then(data => {
      var currentUserFav = data.filter((favBook)=> favBook.email == props.email);
      setAllFavourite([...currentUserFav]);
    })
  }

  //utility function to check if book with given cover_id present
  function favIsAdded(data2) {
    let book = allFavourite.filter((favBook) => {
      return favBook.cover_id == data2;
    });
    //console.log("is this book for email " + props.email + "available " );
    //console.log(book);
    if(book.length == 0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  function saveFavourite(data1, data2){
          if(!favIsAdded(data2)){
          //console.log(props);  
          fetch('http://localhost:3002/favourites',{
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(
                {
                  ...data1
                }
              )
          });
          setOpenSuccess(true);
          getAllFavourite();
          }
          else{
              setMessage("book already added in favourite")
              setOpenError(true);
          }
  }


  //utility function for getting updated recommend data
  const getAllRecommend = async() => {
    fetch("http://localhost:3002/recommend")
    .then(data => data.json())
    .then(data => {
      var currentUserRec = data.filter((recBook)=> recBook.email == props.email);
      setAllRecommend([...currentUserRec]);
    })
  }


  function recIsAdded(data2) {
    let book = allRecommend.filter((recBook) => {
      return recBook.cover_id == data2;
    });
    //console.log("is this book for email " + props.email + "available " );
    //console.log(book);
    if(book.length == 0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  function saveRecommend(data1, data2){
    if(props.isloggedin)
    {
      //console.log(props.isloggedin);
      if(!recIsAdded(data2)){
      //console.log(props);  
      fetch('http://localhost:3002/recommend',{
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
            ...data1
          })
      });
      setOpenSuccess(true);
      getAllRecommend();
      
      }
      else{
          setMessage("book already added in recommendation")
          setOpenError(true);
      }
    }
    else{
      setMessage("not logged in")
      setOpenError(true);
    }
  }

//console.log(`https://openlibrary.org/subjects/${props.category}.json#sort=date_published&ebooks=true`);

  useEffect(() => {
    fetch(`https://openlibrary.org/subjects/${props.category}.json#sort=date_published&ebooks=true`)
      .then(res => res.json()).then(async data => {
        await setbookdata(data.works)
        // console.log(data.works.authors)
        //console.log(data.works[0].hasOwnProperty('authors'))
      })
  }, [])


  return (
    

    // for Science Fiction related books
    <div className="container mt-5">
      <div className="row card shadow g-4 p-3 mb-5 bg-body rounded">
      
        <div class="row row-cols-1 row-cols-md-3 g-4" style={{backgroundColor: "#f3edd7"}}>
         
            {bookdata.map((item) => {
              return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 shiftinsmallscreen">  
                <CategoryWiseBookCard
                {...item} 
                //keys={item.key}
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}
                
                email={props.email}
                isloggedin={props.isloggedin}
                key={item.cover_edition_key}
                title={item.title}
                coverImage={item.cover_edition_key}
                 author= {item.authors.length>0? item.authors[0].name:"NA"}
              />
              </div>
              
            
              )}
              )}
        
        </div>
      </div>

    
 
      

       
     
        <Snackbar open={openSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={5000} onClose={handleClose}>
            <Alert id="success" onClose={handleClose} severity="success">
                book added successfully
            </Alert>
        </Snackbar>
        <Snackbar open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={5000} onClose={handleClose}>
            <Alert id="error" onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    </div>

    


  )
}



export default CategoryWiseBooks;