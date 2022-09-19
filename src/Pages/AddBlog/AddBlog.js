import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddBlog.css"
import TextArea from "../../components/TextArea/TextArea";
import ImageUploader from "../../components/imageUploader/ImageUploader";
import { toast } from "react-toastify";

const Addblog = (props) => {

    const history = useHistory()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState()
    const [bodyfocus, setBodyFocus] = useState(false)
    const [titlefocus, setTitleFocus] = useState(false)
    const [descfocus, setDescFocus] = useState(false)

    const handleDone = async (e) => {
        e.preventDefault()
        const response = await fetch(`${props.baseUrl}api/blogs/addblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, desc, body, image }),
        });
        const json = await response.json();
        if (json.success) {
            toast.success("SuccessFully Blogg Uploaded")
            history.push("/home")
        } else {
            toast.error("Couldn't Upload Blog. Try Again")
        }
    }

    return (
        <div className="blog">
            <div className="container blogcard">
                <div className="card cardcss">
                    <h5 className="card-header">Blogg Preview</h5>
                    <div className="card-body addcard">
                        <div className="d-flex">
                            <ImageUploader setImage={setImage} image={image} />
                            <div className="bloghead mt-4">
                                <div className="mb-4"><TextArea body={title} setFocus={setTitleFocus} focus={titlefocus} use="Title" minH={10} setBody={setTitle} /></div>
                                <TextArea body={desc} setFocus={setDescFocus} focus={descfocus} use="Description" minH={100} setBody={setDesc} />
                            </div>
                        </div>
                        <div className="my-4" style={{ fontSize: "large" }}><TextArea body={body} setFocus={setBodyFocus} focus={bodyfocus} use="Blogg-Body" minH={300} setBody={setBody} /></div>
                        <button className="btn btn-primary" onClick={handleDone}>Done!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addblog