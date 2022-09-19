import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'

import ImageUploader from "../imageUploader/ImageUploader";
import { toast } from "react-toastify";

const ProfileModal = (props) => {

    const style = {
        position: 'absolute',
        top: '53%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        bgcolor: '#fffff0',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const history = useHistory()
    const { open, setOpen, profile, setProfile, image, setImage } = props
    const [editData, setEditData] = useState({})
    const [proPic, setProPic] = useState()
    const [change, setChange] = useState(false)

    useEffect(() => {
        setEditData(profile)
        setProPic(image)
    }, [profile, image])

    const onChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
        setChange(true)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (change || image != proPic) {
            const data = await fetch(`${props.baseUrl}api/auth/editprofile/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authtoken: localStorage.getItem("token"),
                },
                body: JSON.stringify({ fullname: editData.fullname, job: editData.job, bio: editData.bio, image: proPic})
            });
            const jsonData = await data.json();
            if (jsonData.success) {
                setProfile(editData)
                setImage(proPic)
                toast.success("Profile Updated Successfully")
            }
            else {
                toast.error("Error Updating Profile. Try Again")
            }
            setOpen(false)
        }
        else {
            //No Values Changed
            setOpen(false)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" style={{ borderBottom: "1px solid red" }}>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row my-4">
                            <div className="form-group my-3 profilePicture">
                                <label htmlFor="propic">Profile Picture</label>
                                <ImageUploader setImage={setProPic} image={proPic} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text" className="form-control" id="fullname" name="fullname" value={editData.fullname} onChange={onChange} required placeholder="Fullname..." />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="jobD">Job Designation</label>
                                <input type="text" className="form-control" id="job" name="job" value={editData.job} onChange={onChange} required placeholder="Web Developer, Data Scientist etc..." />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <label>Bio</label>
                            <textarea className="form-control" id="bio" name="bio" style={{ maxHeight: 150 }} value={editData.bio} onChange={onChange} required placeholder="Max 250 Characters" maxLength={250}></textarea>
                        </div>
                        <button className='my-2 mx-2 btn btn-outline-danger' type="submit">Update</button>
                        <button className='my-2 mx-2 btn btn-outline-primary' onClick={() => { setOpen(false) }}>Cancel</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ProfileModal