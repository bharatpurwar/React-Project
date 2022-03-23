import React from 'react'
import FavouriteCard from '../favouriteCard/FavouriteCard'
import {useState, useEffect} from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Favourite(props) {

    const [fav, setfav] = useState([])
 

    useEffect(() => {
        fetch(`http://localhost:3002/favourites?email=${props.email}`)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setfav(data);
        })
        
    }, [props.email])
   
    const remove = (data) => {
        fetch(`http://localhost:3002/favourites/${data}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(res => {
            getFavData();
        })
    }
    const getFavData = async () => {
        fetch(`http://localhost:3002/favourites?email=${props.email}`)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setfav(data);
        })
    }

    return (
        <div className="container" >
            <div className="row ">
                
            <h1 data-testid="title" id="favHeading" style={{color:"#836d1e", textAlign:"center"}}>My Favourites</h1>

            {fav.map((item) => {
                //console.log(item);
                let key = `${item.cover_edition_key}${item.lending_edition}`;
                //console.log(key);
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
