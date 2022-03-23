import React, { useEffect, useState } from "react";

const AuthorsCard = (props) => {
    return (
        <div className="col-sm-6 col-lg-3">
            
        <div className="card" style={{width: "18rem"}}>
            <img src={`http://covers.openlibrary.org/b/id/${props.photos[0]}-L.jpg`} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">name {props.name}</h5>
                <p data-testid="birthdate" className="card-text">DoB {props.birth_date}</p>
            </div>
        </div>

        </div>
    )
}

export default AuthorsCard;