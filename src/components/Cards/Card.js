import React, { useState, useEffect } from 'react';
import './Card.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

function Card(props) {

    const history = useHistory()
    const [readTime, setReadTime] = useState()

    function readingTime() {
        const text = props.body
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        setReadTime(time)
    }

    useEffect(() => {
        readingTime()
    }, [])


    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/viewblog/${props.Bid}`)
    }
    return (
        <div className="card my-2" onClick={handleClick}>
            <p className="card-header" style={{ fontStyle: "italic", textAlign: "end" }}><small>Uploaded by {props.name}</small></p>
            <div className="card-body d-flex flex-row">
                <img src={props.image ? props.image : "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} className="img-fluid" />
                <div className="straigth">
                    <span className='badge rounded-pill CardBadge'>{readTime} Minutes Read</span>
                    <h5 className="card-title mx-3 my-3">{props.title}</h5>
                    <p className="card-text mx-3 my-3"> {props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card