import React, {useState, useEffect } from "react";
import SubjectAuthorCard from "./SubjectAuthorCard"
const SubjectAuthor = (props) => {
    const [allAuthorsData, setAllAuthorsData] = useState([]);

    useEffect(async ()=>{
        let  authorData = [];
        for(let author of props.subjectAuthor){
            await fetch(`https://openlibrary.org${author.key}.json`)
            .then(data => data.json())
            .then(data => {
            authorData.push({...data})
            })
        }
        //console.log(authorData);    
        setAllAuthorsData([...authorData]);
    },[props.subjectAuthor]);




    return (
        <div className="container">
            <div className="row ">
                
            <h1 id="authorHeading" style={{color:"#836d1e", textAlign:"center"}}>Authors</h1>

            {allAuthorsData.map((item) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 shiftinsmallscreen">  
              <SubjectAuthorCard
                
                {...item} 
                keys={item.key}
                authorname={item.name}
              />
              </div>
              
            )}
            )}
            </div>
        </div>
    )
}

export default SubjectAuthor;