import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Settings.css"
import 'bootstrap/dist/css/bootstrap.css';

import Card from "../../components/Cards/Card";
import ProfileModal from "../../components/ProfileModal/ProfileModal";


const Settings = (props) => {
    const history = useHistory()
    const [profile, setProfile] = useState({})
    const [image, setImage] = useState()
    const [blogs, setBlogs] = useState([])

    //? Modal Variable
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${props.baseUrl}api/auth/getuser/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authtoken: localStorage.getItem("token"),
                },
            });
            const jsonData = await data.json();
            if (jsonData.success) {
                setProfile({ fullname: jsonData.user.fullname, email: jsonData.user.email, job: jsonData.user.job, bio: jsonData.user.bio, username: jsonData.user.username })
                setImage(jsonData.user.image)
            }
            else {
                history.push("/")
                toast.error("Token Expired. Login Again")
            }
        }
        fetchData()

        const getBlogs = async () => {
            const response = await fetch(`${props.baseUrl}api/blogs/editblog`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
            })
            const data = await response.json()
            setBlogs(data.blog)
        }
        getBlogs()
    }, [])


    return (
        <div className="settings">
            <div className="profile">
                <ProfileModal open={open} setOpen={setOpen} profile={profile} setProfile={setProfile} setImage={setImage} image={image} baseUrl={props.baseUrl} />
                <div className="container mt-5">
                    <div className="row d-flex">
                        <div className="card p-3 py-4 flex-row">
                            <div className="text-center profilePic">
                                <img src={image} width="200" />
                            </div>

                            <div className="mx-3">
                                <h4 className="mt-2 mb-2">{profile.fullname}</h4>
                                <h6 className="mb-2">@{profile.username}</h6>
                                <span>{profile.job}</span>

                                <div className="mt-1">
                                    <p className="fonts">{profile.bio}</p>

                                </div>

                                <div className="buttons">

                                    <button className="btn btn-outline-primary">Message</button>
                                    <button className="btn btn-primary px-4 ms-2" onClick={() => { setOpen(true) }}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bloggs Start From Here */}
                <h3 className="my-4 mx-4">Bloggs</h3>
                <div className="container">
                    {blogs.map(element => {
                        return <Card key={element._id} Bid={element._id} title={element.title} desc={element.description} name={element.username} image={element.image} body={element.data} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Settings