import React from 'react'
import {useState,useEffect} from "react"

export default function AuthorDetail(props) {
    const [authordata, setauthordata] = useState({})

useEffect(() => {
    fetch(`https://openlibrary.org/authors/${props.match.params.id}.json`)
    .then(res=>res.json())
    .then(data=>setauthordata(data))
}, [])

    //console.log(`https://openlibrary.org/authors/${props.match.params.id}.json`);

   


    return (
        <div class="container mt-5">
            <div class="row  mb-4  shadow p-3 mb-2  rounded" style={{ backgroundColor: "#fffadf" }}>


                <div class=" col-3">


                    {/* <img src={`https://covers.openlibrary.org/a/id/${authordata.photos[0]}-M.jpg`} class="card-img-top mt-4" alt="..." style={{ height: "350px" }} /> */}

                </div>


                <div class="col-8 mt-4">

                    <h4 >{authordata.personal_name}</h4>

                    {/* <p class="float-start"><span>Author Name:</span> {authordata.personal_name}</p> */}
                     {/* <p class="float-start mt-2">span>Description :</span> {bookdata.description}</p> */}
                    <p class="float-start mt-2"><span>Date of Birth :</span>{authordata.birth_date}-{authordata.death_date}</p>
                    <p class="float-start mt-2"><span>bio   :</span> {authordata.bio}</p>
                    {/* <p class="float-start mt-2"><span>Last Revision  :</span> {bookdata.latest_revision}</p> */}


                    
                </div>
               
            </div>

        </div>
    )
}
