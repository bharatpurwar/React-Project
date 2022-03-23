import React, { useState, useEffect } from "react";
import Login from "./Components/login/Login";
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Header from "./Components/header/Header";
import './App.css';

import Dashboard from "./Components/dashboard/Dashboard";
import SubjectAuthor from "./Components/SubjectAuthor/SubjectAuthor";
import Register from "./Components/register/Register";
import Favourite from "./Components/favourite/Favourite";
import Recommend from "./Components/recommend/Recommend";
import SearchBook from "./Components/searchBooks/SearchBooks";
import jwt_decode from 'jwt-decode';
import Bookdetails from "./Components/bookdetails/Bookdetails";
import AuthorDetail from "./Components/authordetails/AuthorDetail";
import CategoryWiseBooks from "./Components/categorywisebooks/CategoryWiseBooks";
import CategoryWiseAuthors from "./Components/categorywiseauthors/CategoryWiseAuthors";
import Footer from "./Components/footer/Footer";


function App() {
  const [username, setUsername] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [bookdata, setbookdata] = useState("");


  //getting current email from login page
  const getEmail = (data) => {
    setCurrentEmail(data);
  }

  //setting data for search bar
  const [allData, setAllData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [titleData, setTitleData] = useState({});


  //getting current path variable(will use in pageRefresh)
  let currentpath = "";
  //try to use "window.location.pathname"

  //check for page refresh
  const pageRefresh = async (email, password) => {
    await fetch('http://localhost:9000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200){
                    //console.log(data);
                    setUsername(data.userData.firstname, true);
                    setCurrentEmail(data.userData.email);
                    
                }
                else if(data.status === 401){
                    //alert(data.message);
                    //alert("invalid token in local-storage");
                    
                }
            })

  }
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        var token = localStorage.getItem('token');
        if(!token==""){
          let value = jwt_decode(token);
          let email = value.email;
          let password = value.password;
          pageRefresh(email, password);
          setLoggedIn(true);
          //alert( "This page has token" );
        }
        else
        {
          //alert( "This page does not have token");
        }
        
      } 
      // else {
      //   alert( "This page is not reloaded");
      // }
    }
    // window.onbeforeunload = function() {
    //     return true;
    // };

    // return () => {
    //     window.onbeforeunload = null;
    // };
  }, [username, LoggedIn, currentEmail]);

  const getAllData = (data) => {
    //console.log(data);
    setAllData({...data});
  }
  const getAuthorData = (data) => {
    //console.log(data);
    setAuthorData({...data});
  }

  const getTitleData = (data) => {
    //console.log(data);
    setTitleData({...data});
  }

  //const [profileId, setProfileId] = useState("");

  //let history = useHistory();

  const setUserName = (value1, value2) => {
    //console.log(value1, value2);
    setUsername(value1);
    setLoggedIn(value2);
  }

  // const ViewProfile = (id) => {
  //   console.log(id);
  //   setProfileId(id);
  //   history.push("/profile");
  //   //Giving error "cannot read property push of undefined" 
  // }



  //get which author to choose based on subject on navbar
  //let history = useHistory();
  
  const [subjectAuthor, setSubjectAuthor] = useState([]);
  const setAuthor = async (data) => {  
    setSubjectAuthor([...data]);  
    //console.log(data);   
  }
  
  function showBookDetails(data){
 
    setbookdata(JSON.parse(data));
    //console.log("app"+bookdata)
    //console.log("title"+bookdata.title)
  
  }
 
  return (
    <Router>
      <Header getAuthorData={getAuthorData} setAuthor={setAuthor} getAllData={getAllData} getTitleData={getTitleData} handleUserName={setUserName} currentuser={username} isloggedin={LoggedIn}/>
      <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={() => <Dashboard isloggedin={LoggedIn} email={currentEmail} showBookDetails={showBookDetails}/> } />
          <Route exact path="/favourite" component={() => LoggedIn ? <Favourite isloggedin={LoggedIn} email={currentEmail}/> : <Redirect to="/login" />} />
          <Route exact path="/recommend" component={() => LoggedIn ? <Recommend isloggedin={LoggedIn} email={currentEmail}/> : <Redirect to="/login" />} />

          {/*browsing author category */}
          <Route exact path="/authorcategory/scifi" component={()=><CategoryWiseAuthors category="scifi" isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/authorcategory/romance" component={()=><CategoryWiseAuthors category={"romance"} isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/authorcategory/kids" component={()=><CategoryWiseAuthors category={"kids"}isloggedin={LoggedIn} email={currentEmail}/> }/>
          <Route exact path="/authorcategory/humor" component={()=><CategoryWiseAuthors category={"humor"}isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/authorcategory/autobiographies" component={()=><CategoryWiseAuthors category={"autobiographies"}isloggedin={LoggedIn} email={currentEmail}/>}/>

          {/*browsing book category */}
          <Route exact path="/bookcategory/scifi" component={()=><CategoryWiseBooks category="scifi" isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/bookcategory/romance" component={()=><CategoryWiseBooks category={"romance"} isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/bookcategory/kids" component={()=><CategoryWiseBooks category={"kids"} isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/bookcategory/humor" component={()=><CategoryWiseBooks category={"humor"} isloggedin={LoggedIn} email={currentEmail}/>}/>
          <Route exact path="/bookcategory/autobiographies" component={()=><CategoryWiseBooks category={"autobiographies"} isloggedin={LoggedIn} email={currentEmail}/>}/>

         {/* <Route exact path="/bookdetails" component={Bookdetails} bookdata={bookdata}/> */}
          
          <Route exact path="/bookdetails" render={(props) => <Bookdetails {...props} book={bookdata} />} />
          <Route exact path="/authordetails/authors/:id" component={AuthorDetail}/>

          <Route exact path="/authors" 
          render={() => (
            <SubjectAuthor subjectAuthor= {subjectAuthor}/>
          )}
          />

          <Route exact path="/login" 
          component={(props) => LoggedIn ? <Redirect to={currentpath} /> : <Login handleUserName = {setUserName} {...props} getEmail={getEmail}/>
          }
          />
          
          if({titleData.length>0})

           <Route exact path="/search" component={() => <SearchBook  {...titleData}/> }/>
          
          if{authorData.length>0}
           <Route exact path="/searchauthor" component={() => <SearchBook  {...authorData}/> }/>
          
          if{allData.length>0}
         <Route exact path="/searchall" component={() => <SearchBook  {...allData}/> }/>
        
          <Route exact path="/login" 
          render={(props) => (
            <Login handleUserName = {setUserName} {...props}/>
          )}

          />

      </Switch>  
      
    </Router>
  );
}

export default App;
