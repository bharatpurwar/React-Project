import React from 'react'
import { useState, useEffect } from "react"
import Books from '../books/Books';
import "./Dashboard.css";
import Carousel from 'react-elastic-carousel';
import useWindowDimensions from"../useWindowDimensions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Dashboard(props) {

  //setting state for showing data of books of different subjects
  const [scifi, setScifi] = useState([]);
  const [romance, setRomance] = useState([]);
  const [autobiography, setAutobiography] = useState([]);
  const [kids, setKids] = useState([]);
  const [humor, setHumor] = useState([]);

  //getting width and height of window to make site responsive
  const { height, width } = useWindowDimensions();
  const [noOfCards, setNoOfCards] = useState(5);

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
    fetch("http://localhost:3002/favourites")
    .then(data => data.json())
    .then(data => {
      var currentUserFav = data.filter((favBook)=> favBook.email == props.email);
      setAllFavourite([...currentUserFav]);
    })
  },[props.email])

  //getting current rec data
  useEffect(()=>{
    fetch("http://localhost:3002/recommend")
    .then(data => data.json())
    .then(data => {
      var currentUserFav = data.filter((favBook)=> favBook.email == props.email);
      setAllRecommend([...currentUserFav]);
    })
  },[props.email])

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

  useEffect(()=>{
    //console.log(width);  
    if(width >= 1400)
    {
        setNoOfCards(4);
    }
    else if(width < 1400 & width >= 992){
        setNoOfCards(3);
    }
    else if(width < 992 & width >= 768)
    {
        setNoOfCards(2);
    }
    else{
        setNoOfCards(1);
    }

  },[width, height, noOfCards])

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/science_fiction.json#sort=date_published&ebooks=true")
      .then(res => res.json()).then(async data => {
        await setScifi(data.works)
        //console.log(data.works.authors)
      })
  }, [])

  
  useEffect(() => {
    fetch("https://openlibrary.org/subjects/romance.json#sort=date_published&ebooks=true")
      .then(res => res.json()).then(async data => {
        await setRomance(data.works)
        //console.log(data.works.authors)
      })
  }, [])
 
  useEffect(() => {
    fetch("https://openlibrary.org/subjects/autobiography.json#sort=date_published&ebooks=true")
      .then(res => res.json()).then(async data => {
        await setAutobiography(data.works)
        //console.log(data.works.authors)
      })
  }, [])

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/juvenile_literature.json#sort=date_published&ebooks=true")
      .then(res => res.json()).then(async data => {
        await setKids(data.works)
        //console.log(data.works.authors)
      })
  }, [])
  useEffect(() => {
    fetch("https://openlibrary.org/subjects/humor.json#sort=date_published&ebooks=true")
      .then(res => res.json()).then(async data => {
        await setHumor(data.works)
        //console.log(data.works.authors)
      })
  }, [])

  function showBookDetails(data){
    //console.log("Dashboard"+data)

    props.showBookDetails(data)
    
  }
  return (
    

    // for Science Fiction related books
    <div className="container mt-5">
      <div className="row card shadow g-4 p-3 mb-5 rounded" style={{backgroundColor:"#ded1a5"}}>
        <h2 data-testid="Science">Science Fiction</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{backgroundColor: "#f3edd7"}}>
          <Carousel itemsToShow={noOfCards}>
            {scifi.map((item) => (
              <Books
                {...item} 
                //keys={item.key}
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}
                
                //showing book after clicking on book
                showBookDetails={showBookDetails}
                bookkey={item.key}

                email={props.email}
                isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author= {item.authors.length>0? item.authors[0].name:"NA"}
              
              />
            ))}
          </Carousel>
        </div>
      </div>

      {/* for Romance subject */}

      <div className="row card shadow g-4 p-3 mb-5 rounded" style={{backgroundColor:"#ded1a5"}}>
        <h2 data-testid="Romance">Romance</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{backgroundColor: "#f3edd7"}}>
          <Carousel itemsToShow={noOfCards}>
            {romance.map((item) => (
              <Books
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}

                //showing book after clicking on book
                showBookDetails={showBookDetails}
                bookkey={item.key}
              
                {...item} 
                email={props.email}
                isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author= {item.authors.length>0? item.authors[0].name:"NA"}
              
              />
            ))}
          </Carousel>
        </div>
      </div>
 
       {/* for autobiography books */}
      <div className="row card shadow g-4 p-3 mb-5 rounded" style={{backgroundColor:"#ded1a5"}}>
        <h2 data-testid="Biography">Autobiographies</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4"style={{backgroundColor: "#f3edd7"}}>
          <Carousel itemsToShow={noOfCards}>
            {autobiography.map((item) => (
              <Books
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}

                //showing book after clicking on book
                showBookDetails={showBookDetails}
                bookkey={item.key}
              
                {...item} 
                email={props.email}
                isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author= {item.authors.length>0? item.authors[0].name:"NA"}
              
              />
            ))}
          </Carousel>
        </div>
      </div>

          {/* for kids books */}
          <div className="row card shadow g-4 p-3 mb-5 rounded" style={{backgroundColor:"#ded1a5"}}>
        <h2 data-testid="kids">Kids</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4"style={{backgroundColor: "#f3edd7"}}>
          <Carousel itemsToShow={noOfCards}>
            {kids.map((item) => (
              <Books
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}

                //showing book after clicking on book
                showBookDetails={showBookDetails}
                bookkey={item.key}
              
                {...item} 
                email={props.email}
                isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author= {item.authors.length>0? item.authors[0].name:"NA"}
              
              />
            ))}
          </Carousel>
        </div>
      </div>

          {/* for humor books */}
          <div className="row card shadow g-4 p-3 mb-5 rounded" style={{backgroundColor:"#ded1a5"}}>
        <h2 data-testid="comics">Humor Comics</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4"style={{backgroundColor: "#f3edd7"}}>
          <Carousel itemsToShow={noOfCards}>
            {humor.map((item) => (
              <Books
                getCurrentBookData={getCurrentBookData}
                getCurrentRecBookData={getCurrentRecBookData}

                //showing book after clicking on book
                showBookDetails={showBookDetails}
                bookkey={item.key}
              
                {...item} 
                email={props.email}
                isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author= {item.authors.length>0? item.authors[0].name:"NA"}
              
              />
            ))}
          </Carousel>
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



export default Dashboard;