import React from 'react'
import FavouriteCard from '../favouriteCard/FavouriteCard'
import {useState, useEffect} from "react"

export default function Recommend(props) {

    const [fav, setfav] = useState([])
 

    useEffect(() => {
        fetch("http://localhost:3002/recommend")
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            //don't get confused by state name "favBook". It will store data for recommended
            //only========================================================================== 
            setfav(data.filter((favBook)=> favBook.email == props.email));
        })
        
    }, [])
    const remove = (data) => {
        fetch(`http://localhost:3002/recommend/${data}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(res => {
            getFavData();
        })
    }
    const getFavData = async () => {
        fetch("http://localhost:3002/recommend")
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setfav(data.filter((favBook)=> favBook.email == props.email));
        })
    }

    return (
        <div className="container">
            <div className="row ">
                
            <h1 data-testid="title" id="recHeading" style={{color:"#836d1e", textAlign:"center"}}>My Recommendation</h1>

            {fav.map((item) => {
                let key = `${item.cover_edition_key}${item.title}`;
                return (
                
              <div className="col-lg-3 col-md-4 col-sm-6 shiftinsmallscreen" key={key}>  
              <FavouriteCard
                remove={remove}
                {...item} 
                //keys={item.key}
                isloggedin={props.isloggedin}
                
                title={item.title}
                coverImage={item.cover_edition_key}
                author={item.authors[0].name}
              />
              </div>
              
            )}
            )}
            </div>
            
        
        </div>
    )
}
