import React from 'react'
//import FavouriteCard from '../favouriteCard/FavouriteCard'
//import {useState, useEffect} from "react"
import SearchBookCard from "../searchBookCard/SearchBookCard"

export default function SearchBook(props) {


    return (
        <div class="container mt-5 " >
            <div class="row card shadow p-3 mb-5  rounded" style={{backgroundColor:"#e1dab4"}}>
                <div class="col-md-8 offset-md-2 ">
                
            <h3 id="searchHeading" style={{color:"#836d1e", textAlign:"center"}}>ADVANCED SEARCH</h3>

            {props.docs.map((item) => (
            //   <div className="col-lg-3 col-md-4 col-sm-6 shiftinsmallscreen">  
              <SearchBookCard
                {...item}
                //keys={item.key}
                // isloggedin={props.isloggedin}
                key={item.key}
                title={item.title}
                coverImage={item.cover_edition_key}
                author={item.author_name}
              />
            //   </div>
              
            ))}
            </div>
            </div>
        
        </div>
    )
}
