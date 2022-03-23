import React, { useEffect, useState } from "react";
import AuthorsCard from "../card/AuthorsCard";
import GetUrl from "../geturl/GetUrl";
import { useHistory } from "react-router-dom";

const Authors = (props) => {
    
    const [authorsData, setAuthorsData] = useState([]);
    let history = useHistory();

    const getBooksBasedOnSubject = async (data) => {
        //console.log(data);

        //getting all the authors by subjects================================
        //we can also include this code in===================================
        //getUrl can pass authors data as prop===============================
        let authors=[];
    
        for (const element of data.authors){    
            await fetch(`http://openlibrary.org${element.key}.json`)
            .then(res => res.json())
            .then(data => {
                authors.push(data);
                //console.log(data);
            })
        }
        //console.log(authors);
        await setAuthorsData(authors);

    }

    useEffect(() => {
        if(props.isloggedin)
        {
        //console.log("no url added");
        }
        else{
            history.push("/login");
        }
    }, []);

    return (
        <div className="dashboard row">
        <GetUrl getData={getBooksBasedOnSubject}/>
        {
            authorsData.map(books => (
                <AuthorsCard {...books} keys={books.key}/>
            ))
        }
        </div>
    )
}

export default Authors;