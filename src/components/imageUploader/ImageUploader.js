import React, { useState, useEffect, useRef } from 'react'
import UploadIcon from "../../images/upload-icon.svg"
import { toast } from 'react-toastify'


const ImageUploader = (props) => {
    const { image, setImage } = props
    const myRef = useRef(null);
    const [preview, setPreview] = useState()

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "kanklyyi")
        data.append("cloud_name", "defbkjamq")
        fetch("  https://api.cloudinary.com/v1_1/defbkjamq/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setImage(data.url)
                toast.success("Image Uploaded")
            })
            .catch(err => {
                console.log(err)
                toast.warn("Coudn't Upload Image. Try Again")
            })
    }

    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }
        let urlimage = isValidHttpUrl(image)
        if (!urlimage) {
            const objectUrl = URL.createObjectURL(image)
            setPreview(objectUrl)
            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [image])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }
        setImage(e.target.files[0])
    }

    return (
        <div>
            <div style={{ marginRight: "20px" }}>
                <input type='file' accept="image/png, image/avif, image/jpeg" onChange={onSelectFile} ref={myRef} style={{ display: "none" }} />
                <img src={preview ? preview : (image ? image : UploadIcon)} onClick={() => { myRef.current.click() }} style={{ cursor: "pointer" }} />
                <br /><button className='btn btn-primary mx-2 my-2' onClick={uploadImage} disabled={image ? false : true}>Upload</button>
            </div>
        </div>
    )
}
export default ImageUploader;