import React from 'react'
import { useState, useEffect } from "react"
import Books from '../books/Books';


import CategoryWiseAuthorsCard from './CategoryWiseAuthorsCard';



function CategoryWiseAuthors(props) {

  //setting state for showing authors of different subjects
  const [authorsdata, setAuthorsData] = useState([]);

  useEffect(() => {

    fetch(`http://openlibrary.org/subjects/${props.category}.json?details=true`)
    .then(data => data.json())
    .then(data => {
        //console.log(data);
        getData(data);
    })
  }, [])

  const getData = async (data)=>{
    //console.log(data);  
    let  authorData = [];
    for(let author of data.authors){
        await fetch(`https://openlibrary.org${author.key}.json`)
        .then(data => data.json())
        .then(data => {
        authorData.push({...data})
        })
    }    //console.log(authorData);    
    setAuthorsData([...authorData]);
};


  return (
    

    // for Science Fiction related books
    <div className="container">
      <div className="row ">
      
      <h1 data-testid="title" id="authorHeading" style={{color:"#836d1e", textAlign:"center"}}>Authors</h1>
         
            {authorsdata.map((item) => {
                if(item.birth_date)
                {
                return (
                <div className="col-lg-3 col-md-4 col-sm-6 shiftinsmallscreen">  
                <CategoryWiseAuthorsCard
                {...item} 
                birthdate={item.birth_date}
                keys={item.key}
                authorname={item.name}
                />
                </div>
                )}
                }
            )}
      </div>
    </div>

    


  )
}



export default CategoryWiseAuthors;