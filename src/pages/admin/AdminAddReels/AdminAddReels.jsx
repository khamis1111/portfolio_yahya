import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SdebarAdmin from '../../../utils/SidebarAdmin'
import notify from '../../../utils/useToastify'
import ButtonGlitch from '../../../utils/ButtonGlitch/ButtonGlitch'
import UploadImg from '../../../utils/UploadImg/UploadImg'
import { PostDataImage } from '../../../api/Axios/usePostData'
// import './AdminAddReels.css'

const AdminAddReels = () => {
    const [loading, setLoading] = useState(false);

    const [videoSrc, setVideoSrc] = useState(null);

    const [name, setName] = useState("");
    const [likes, setLikes] = useState(0);

    const handleAddReels = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("likes", likes);
        formData.append("reelsVideo", videoSrc);

        PostDataImage(`/api/v1/reels`, formData).then(res => {
            notify('Add Your Reels Successfully', 'success')
            setLoading(false)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
            setLoading(false)
        });
    }

    return (
        <Row className='adminReels'>
            <SdebarAdmin />
            <Col sm={9} className='right ps-5'>
                <div className="form-container">
                    <form className="form" >
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="form-group">
                                <label for="imgProfile" className='fs-5'>Reels Video: </label>
                                <div className=''>
                                    <UploadImg setVideoSrc={setVideoSrc} videoSrc={videoSrc} type={'video'} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="name">Your Name</label>
                            <input required="" name="name" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="likes">Video Likes</label>
                            <input required="" name="likes" id="likes" type="number" value={likes} onChange={(e) => setLikes(e.target.value)} />
                        </div>
                        <div className="text-end">
                            <ButtonGlitch name={'Add'} loading={loading} handle={(e) => handleAddReels(e)} />
                        </div>
                    </form>
                </div>
            </Col>
        </Row >
    )
}

export default AdminAddReels
