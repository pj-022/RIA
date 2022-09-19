import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./ViewBlog.css"
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai"
import { MdDeleteForever } from "react-icons/md"
import TextArea from "../../components/TextArea/TextArea";
import ModalPage from "../../components/Modal/Modal";
import ImageCloud from "../../components/imageUploader/ImageUploader";



const ViewBlog = (props) => {

    const history = useHistory()
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [body, setBody] = useState()
    const [name, setname] = useState()
    const [image, setImage] = useState([])
    const [date, setDate] = useState()
    const [titlefocus, setTitleFocus] = useState(false)
    const [descfocus, setDescFocus] = useState(false)
    const [bodyfocus, setBodyFocus] = useState(false)
    const { id } = useParams()

    //?Edit Variable
    const [Edit, setEdit] = useState(false)
    const toggleChecked = () => setEdit(value => !value);

    //? Privilege Variable for Owner of Blogg
    const [privilege, setPrivilege] = useState(false)

    //?Change Variable
    const [change, setChange] = useState(false)

    //?Modal Variable
    const [open, setOpen] = useState(false);

    const handleDone = async () => {
        const response = await fetch(`${props.baseUrl}api/blogs/oneblog/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setTitle(json.blog.title)
        setDesc(json.blog.description)
        setBody(json.blog.data)
        setname(json.blog.username)
        setImage(json.blog.image)
        setDate(json.blog.date)


        if (json.blog.userid === localStorage.getItem("userid")) {
            setPrivilege(true)
        }
        else {
            setPrivilege(false)
        }
    }
    const onDone = () => {
        history.goBack()
    }

    const handleDeletebtn = async () => { setOpen(true) }

    const handleDelete = async () => {
        const response = await fetch(`${props.baseUrl}api/blogs/deleteblog/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        if (json.success) {
            toast.warn("Blogg Deleted Successfully")
            history.push("/home")
        }
        else {
            toast.error("Some Error Ocurred, Try Again")
        }
        setOpen(false)

    }

    const onSave = async () => {
        if (change) {
            const response = await fetch(`${props.baseUrl}api/blogs/editblog/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, desc, body, image })
            });
            const json = await response.json();
            if (json.success) {
                toast.success("Blogg Updated Successfully")
            }
            else {
                toast.error("Some Error Ocurred, Try Again")
            }
        }
        setChange(false)
        toggleChecked()
    }

    useEffect(() => {
        handleDone()
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setChange(true)
    }, [title, desc, body])

    useEffect(() => {
        const d = new Date(date)
        setDate(d.toLocaleString())
    }, [date])
    return (
        <div className="vblog">
            <div className="blogcard">
                <ModalPage open={open} setOpen={setOpen} handleButton={handleDelete} />
                <div className="card my-2">
                    <p className="card-header" style={{ fontStyle: "italic", textAlign: "end" }}><small>Uploaded by {name}</small></p>
                    <div className="card-body d-flex flex-row">
                        {Edit ? <ImageCloud setImage={setImage} image={image} /> : <img src={image} style={{ marginRight: 20 }} />}
                        <div className="container">
                            {privilege && <div className="editButton">
                                <button className={"btn btn-outline-danger mx-3"} onClick={handleDeletebtn}><MdDeleteForever style={{ height: 30, width: 30 }} /></button>
                                <button className={"btn " + (Edit ? "btn-success" : "btn-outline-primary")} onClick={toggleChecked}><AiOutlineEdit style={{ height: 30, width: 30 }} /></button>
                                {Edit && <small className="mx-4">Click on The Item You Want Edit</small>}
                            </div>}
                            <div className="editDiv">
                                {Edit ? <TextArea body={title} setFocus={setTitleFocus} focus={titlefocus} use="Title" minH={10} setBody={setTitle} />
                                    : <h5 className="card-title">{title}</h5>}
                            </div>
                            {Edit ? <TextArea body={desc} setFocus={setDescFocus} focus={descfocus} use="Description" minH={100} setBody={setDesc} />
                                : <p className="card-text">{desc}</p>}
                        </div>
                    </div>
                    <div className="blogb">
                        {Edit ? <TextArea body={body} setFocus={setBodyFocus} focus={bodyfocus} use="Blogg-Body" minH={300} setBody={setBody} />
                            : <p>{body}</p>}
                    </div>
                    {Edit && privilege ? <button className="btn btn-primary mx-4 my-2" style={{ width: 140 }} onClick={onSave}>Save Changes</button>
                        : <button className="btn btn-primary mx-4 my-2" style={{ width: 140 }} onClick={onDone}>Done!</button>}
                    <p className="mx-2" style={{ fontStyle: "italic", textAlign: "end" }}><small>Uploaded on {date}</small></p>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog