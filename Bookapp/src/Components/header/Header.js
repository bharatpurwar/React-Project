import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Header = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };
  let history = useHistory();
  const setAuthor = (data) => {
    if(data!="notdefined"){
    //console.log(`http://openlibrary.org/subjects/${data}.json?details=true`)
    fetch(`http://openlibrary.org/subjects/${data}.json?details=true`)
    .then(data => data.json())
    .then(data => {
        //console.log(data);
        props.setAuthor([...data.authors]);
        // getBooksBasedOnSubject(data);
    })
    setTimeout(()=>{
      history.push("/authors")
    },3000);
    
    }
    

  }
  
  const useHistory1=useHistory();
   //for dynamic creation of redirecting URL
  let redirectUrl="";

  const getTypeOfSourceAndSearchValue = async (typeOfSource, searchValue) => {
    if(!searchValue==""){
      if(typeOfSource==="all" || typeOfSource==="")
      {
      	redirectUrl="/searchall"
        //console.log(`http://openlibrary.org/search.json?q=${searchValue.split(' ').join('+')} ${typeOfSource}`);
        await fetch(`http://openlibrary.org/search.json?q=${searchValue.split(' ').join('+')}`)
        .then(res => res.json())
        .then(data => {
          props.getAllData({...data});
        })
      }
      else if(typeOfSource==="author")
      {
      	redirectUrl="/searchAuthor";
        //console.log(`http://openlibrary.org/search.json?author=${searchValue.split(' ').join('+')} ${typeOfSource}`);
        await fetch(`http://openlibrary.org/search.json?author=${searchValue.split(' ').join('+')}`)
        .then(res => res.json())
        .then(data => {
          props.getAuthorData({...data});
        })
      }
      else if(typeOfSource==="title")
      {
      	redirectUrl="/search";
        //console.log(`http://openlibrary.org/search.json?title=${searchValue.split(' ').join('+')} ${typeOfSource}`);
        await fetch(`http://openlibrary.org/search.json?title=${searchValue.split(' ').join('+')}`)
        .then(res => res.json())
        .then(data => {
          props.getTitleData({...data});
        })
      }
    }
    else
    {
      setOpen(true);
    }useHistory1.push(redirectUrl);

  }

  if(props.isloggedin)
  {
    return (
    <div>  
    <LoggedInHeader currentuser={props.currentuser} handleUserName={props.handleUserName} getTypeOfSourceAndSearchValue={getTypeOfSourceAndSearchValue}/>
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert id="error" onClose={handleClose} severity="error">
          search box is empty
        </Alert>
    </Snackbar>
    </div>
    )
  }
  else
  {
    return (
    <div>  
    <NotLoggedInHeader setAuthor={setAuthor} getTypeOfSourceAndSearchValue={getTypeOfSourceAndSearchValue}/>
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert id="error" onClose={handleClose} severity="error">
          search box is empty
        </Alert>
    </Snackbar>
    </div>
    )
  }
}

const LoggedInHeader = (props) => {
  const [typeOfSource, setTypeOfSource] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const search = () => {
    props.getTypeOfSourceAndSearchValue(typeOfSource, searchValue);
  }

  let history = useHistory();
  const logOut= () => {
    localStorage.removeItem("token");

    props.handleUserName(null, false);

    history.push("/login");
  }

  return (
    <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-dark  "style={{backgroundColor:"#b7992e"}}>
    <div className="container">
      <a className="navbar-brand"><img src="open-book.svg" width="50px" className="mx-2"></img>Pustakalaya</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
            <Link id="dashboard" to="/" className="nav-link active">Dashboard</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAuthorL" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Author
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownAuthorL">
            <li><Link className="dropdown-item" to="/authorcategory/scifi">Scifi</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/romance">Romance</Link></li>
           <li><Link className="dropdown-item" to="/authorcategory/autobiographies">Autobiographies</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/kids">Kids</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/humor">Humor</Link></li>
          </ul>
          </li>
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownFavRecL" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Fav/Rec
          </a>  
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownFavRecL">
          <li >
            <Link id="favourite" to="/favourite" className="dropdown-item">Favourite</Link>
          </li>
          <li >
            <Link id="recommend" to="/recommend" className="dropdown-item">Recommend</Link>
          </li>
          </ul>
          </li>
         
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBookL" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Book
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownBookL">
            <li><Link className="dropdown-item" to="/bookcategory/scifi">Scifi</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/romance">Romance</Link></li>
           <li><Link className="dropdown-item" to="/bookcategory/autobiographies">Autobiographies</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/kids">Kids</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/humor">Humor</Link></li>
          </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"></a>
          </li>
          <li id="welcomeText" className="navbar-text ">
                 Welcome, {props.currentuser}
             {/* <p>Welcome, {props.currentuser}</p> */}
          </li>
        </ul>
        <form className="d-flex">
          <div className="input-group">
          <span style={{ backgroundColor: "#f5eac4" }} className="input-group-text" id="basic-addon1"> 
            <select id="typeOfSource" className="form-control" style={{maxWidth:"80px"}} onChange={async (e) => await setTypeOfSource(e.target.value)}>
                    <option value="all">all</option>
                    <option value="title">title</option>
                    <option value="author">author</option>
            </select>
          </span>  
          <input id="searchField" className="form-control me-2" type="search" style={{maxWidth:"200px"}} onChange={async (e) => await setSearchValue(e.target.value)} placeholder="Search" aria-label="Search"/>
          </div>
          <button id="searchButton" className="btn px-5" type="button" onClick={search} style={{backgroundColor:"#816606",color:"white"}}>Search</button>
    
        </form>
        <ul className="navbar-nav mr-0">             
             <li className="nav-item">
             <a id="logOut" className="nav-link active" onClick={logOut}>Log Out</a>
             </li>
            
           </ul>
      </div>
    </div>
  </nav>
              
          </div>

  )
}

const NotLoggedInHeader = (props) => {

  const [typeOfSource, setTypeOfSource] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //const [subjectAuthor, setSubjectAuthor]  = useState("");

  const search = () => {
    props.getTypeOfSourceAndSearchValue(typeOfSource, searchValue);
  }
  let history = useHistory();
  const goToAuthors = () => {
    //setTimeout(function(){ history.push('/authors'); }, 3000);
    // history.push('/authors')
  }

    return (
      <div className="container-fluid ">
  <nav className="navbar navbar-expand-lg navbar-dark  "style={{backgroundColor:"#b7992e"}}>
  <div className="container">
    <a className="navbar-brand" href="#"><img src="open-book.svg" width="50px" className="mx-2"></img>Pustakalaya</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <Link id="dashboard" to="/" className="nav-link active">Dashboard</Link>
        </li>

        {/* <select id="authors" className="nav-item dropdown bg-transparent no-border" style={{maxWidth:"80px"}} onChange={async (e) => {
          await props.setAuthor(e.target.value);
          goToAuthors();
          }
        }>
              <option value="notdefined">Authors</option>
              <option value="romance">Romance</option>
              <option value="kids">Kids</option>
        </select> */}

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAuthor" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Author
            </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownAuthor">
            <li><Link className="dropdown-item" to="/authorcategory/scifi">Scifi</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/romance">Romance</Link></li>
           <li><Link className="dropdown-item" to="/authorcategory/autobiographies">Autobiographies</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/kids">Kids</Link></li>
            <li><Link className="dropdown-item" to="/authorcategory/humor">Humor</Link></li>
          </ul>
          </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBook" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Browse
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownBook">
            <li><Link className="dropdown-item" to="/bookcategory/scifi">Scifi</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/romance">Romance</Link></li>
           <li><Link className="dropdown-item" to="/bookcategory/autobiographies">Autobiographies</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/kids">Kids</Link></li>
            <li><Link className="dropdown-item" to="/bookcategory/humor">Humor</Link></li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"></a>
        </li>

      </ul>

      <form className="d-flex">
        <div className="input-group">
        <span style={{ backgroundColor: "#f5eac4" }} className="input-group-text" id="basic-addon1">       
        <select id="typeOfSource" className="form-control" style={{maxWidth:"80px"}} onChange={async (e) => await setTypeOfSource(e.target.value)}>
                <option value="all">all</option>
                <option value="title">title</option>
                <option value="author">author</option>
        </select>
        </span>
        <input id="searchField" className="form-control me-2" type="search" style={{maxWidth:"200px"}} onChange={async (e) => await setSearchValue(e.target.value)} placeholder="Search" aria-label="Search"/>
        </div>
        <button id="searchButton" className="btn px-5" type="button" onClick={search} style={{backgroundColor:"#816606",color:"white"}}>Search</button>
      
      </form>
      <ul className="navbar-nav mr-0">
        <li className="nav-item">
            <Link to="/login" className="nav-link active">Login</Link>
        </li>
        <li className="nav-item">
           <Link id="register" to="/register" className="nav-link active">Register</Link>
        </li>
            
      </ul>
    </div>
  </div>
</nav>
            
</div>
     
    )
}

export default Header;
