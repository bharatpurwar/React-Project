import React from 'react'

export default function SearchBookCard(props) {
  return (
    

    <div class="row  mb-4  shadow p-3 mb-2  rounded" style={{backgroundColor:"#fffadf"}}>


      <div class=" col-4">


        <img src={`https://covers.openlibrary.org/b/olid/${props.coverImage}-M.jpg`} class="card-img-top" alt="..." style={{ height: "200px" }} />
      </div>


      <div class="col-6 mt-4">

        <h4 >{props.title}</h4>
        <p class="float-start"><span>Author :</span> {props.author}</p>
      </div>
      <div class="col-2 mt-4 ">
        <div className="row">
          <button class="btn  mx-2 my-2 "style={{backgroundColor:"#b7992e"}}>Read</button>
      </div>
      </div>
    </div>





  )
}
