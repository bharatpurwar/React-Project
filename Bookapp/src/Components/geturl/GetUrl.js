import React, {useState} from "react";

const GetUrl = (props) => {
    const [subject, setSubject] = useState('');
    let url = "";
    const setUrl = () => {
        if(subject === "")
        {
            url = "";
            //console.log(url);
        }
        else{
            url = "http://openlibrary.org/subjects/"+subject+".json?details=true&limit=20";
            sendData(url);
            //console.log(url);
        }
    }
    const sendData = () => {
        fetch(url)
        .then(data => data.json())
        .then(data => {
            props.getData(data);
        })
    }
    
    return (
        <div className="row">        
            <div className="col-md-4 col-lg-3 col-sm-6 offset-md-4 offset-sm-3">
            <select className="form-control" id="dropdown" onChange={async (e) => await setSubject(e.target.value)}>
                <option>Choose Subject</option>
                <option value="love">love</option>
                <option value="fantasy">fantasy</option>
                <option value="fiction">fiction</option>
            </select>
            </div>

            <div className="offset-md-5 offset-sm-5 offset-5 mb-2 mt-2">
                <button onClick={setUrl} className="btn btn-secondary">Get Books</button>
            </div>
        </div>
    )

}

export default GetUrl;