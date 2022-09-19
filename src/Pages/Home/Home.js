import React, { useState, useEffect } from "react"
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Cards/Card';

const Home = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const getBlogs = async () => {
            const response = await fetch(`${props.baseUrl}api/blogs/fetchnotes`, {
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
            {blogs ?
                <div className="home">
                    {blogs.map(element => {
                        return <Card key={element._id} Bid={element._id} title={element.title} desc={element.description} name={element.username} image={element.image} body={element.data} />
                    })}
                </div> :
                <div style={{minHeight:"100vh", marginTop:"80px", marginLeft:"150px"}}>
                    <h1>Nothing to Show Here &#128542;</h1><br/>
                    <h3>Click on Add Blog to Add a Blogg and get it displayed here</h3><br/>
                    <h4>If did and still not seeing it. Probable cause is database not configured correctly</h4>
                    <h4>This website was developed using "MongoDB". See the documentation <a href="https://www.mongodb.com" style={{color: "blue"}}>here</a></h4>
                </div>
            }
        </div>
    )
}

export default Home