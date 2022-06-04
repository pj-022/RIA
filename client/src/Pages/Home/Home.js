import React, { useState, useEffect } from "react"
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Cards/Card';

const Home = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const getBlogs = async () => {
            const response = await fetch(`${props.baseUrl}/api/blogs/fetchnotes`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
            })
            const data = await response.json()
            setBlogs(data.blogs)
        }
        getBlogs()
    }, [])


    return (
        <div className="content">
            <div className="home">
                {blogs.map(element => {
                    return <Card key={element._id} Bid={element._id} title={element.title} desc={element.description} name={element.username} image={element.image} body={element.data} />
                })}
            </div>
        </div>
    )
}

export default Home