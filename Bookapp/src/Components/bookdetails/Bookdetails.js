import React from 'react'
import { useState, useEffect } from 'react';
import "./Bookdetails.css";
export default function Bookdetails(props) {

const [bookdata, setbookdata] = useState({});
const [subject, setSubject] = useState([]);

useEffect(() => {
    fetch(`https://openlibrary.org.${props.book.key}.json`)
    .then(res=>res.json())
    .then(data=>{
        //console.log(data);
        setbookdata({...data});
        setSubject([...data.subjects]);
    })
}, [])

    //console.log(`https://openlibrary.org.${props.book.key}.json`);

   


    return (
        <div className="container mt-5">
            <div className="row  mb-4  shadow p-3 mb-2  rounded" style={{ backgroundColor: "#fffadf" }}>


                <div className=" col-xl-3 col-lg-4 col-md-4 col-sm-6">


                    <img src={props.book.image} className="card-img-top mt-4" alt="..." style={{ height: "350px" }} />

                </div>


                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-5 col-12 mt-4">

                    <h4 className="text-center">{props.book.title}</h4>

                    <p className="ml-0 palign"><span style={{fontWeight: '500'}} >Author :</span> {props.book.author}</p>
                     {/* <p className="mt-2 palign"><span>Description :</span> {bookdata.description}</p> */}
                    {/* <p className=" mt-2"><span>Subject :</span> {bookdata.subjects}</p> */}
                    <p className=" mt-2 palign"><span>Publish year  :</span> {bookdata.first_publish_date}</p>
                    <p className=" mt-2 palign"><span>Last Revision  :</span> {bookdata.latest_revision}</p>
                    
                    <div>
                    <p className=" mt-2 palign"><span>Subjects  :</span></p>
                    {
                    subject.map((item,index) => {
                        return (<a key={index} href="#">{item}, </a>)
                    })
                    }
                    </div>
                    


                    
                </div>
               
            </div>

        </div>
    )
}
