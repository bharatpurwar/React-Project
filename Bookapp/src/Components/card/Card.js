import React, { useState } from "react";

const Card = (props) => {
    const [isAdded, setIsAdded] = useState(false);


    function saveFavourite(){
        if(!isAdded){
        fetch('http://localhost:3002/favourites',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "authors":props.authors,
                //"availability":props.availability,
                "checked_out":props.checked_out,
                "cover_edition_key":props.cover_edition_key,
                "cover_id":props.cover_id,
                "edition_count":props.edition_count,
                "first_publish_year":props.first_publish_year,
                "has_fulltext":props.has_fulltext,
                "props.ia":props.ia,
                //"ia_collection":props.ia_collection,
                "key":props.keys,
                "lending_edition":props.lending_edition,
                "lending_identifier":props.lending_identifier,
                "lendinglibrary":props.lendinglibrary,
                "printdisabled":props.printdisabled,
                "public_scan":props.public_scan,
                //"subject":props.subject,
                "title":props.title
            })
        });
        setIsAdded(true);
        }
        else{
            alert("already added");
        }
    }

    return (
        <div className="col-sm-6 col-lg-3">
            
        <div className="card" style={{width: "18rem"}}>
            <img src={`http://covers.openlibrary.org/b/id/${props.cover_id}-L.jpg`} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">Book {props.title}</h5>
                <p data-testid="author" className="card-text">author {props.authors[0].name}</p>
                <a href="#" className="btn btn-primary" onClick={saveFavourite.bind(this)}>Favourite</a>
            </div>
        </div>

        </div>
    )
}

export default Card;