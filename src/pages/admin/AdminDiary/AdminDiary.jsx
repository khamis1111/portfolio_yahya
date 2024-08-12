import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, ToastContainer } from 'react-bootstrap'
import Loader from '../../../utils/Loader/Loader'
import SdebarAdmin from '../../../utils/SidebarAdmin'
import { GetData } from '../../../api/Axios/useGetData'
import { DeleteData } from '../../../api/Axios/useDeleteData'
import ButtonGlitch from '../../../utils/ButtonGlitch/ButtonGlitch'
import { PostData } from '../../../api/Axios/usePostData'
import notify from '../../../utils/useToastify'
import { EditData } from '../../../api/Axios/useEditData'
import { getEmbedUrl } from '../../../utils/GetEmbedUrl'

const AdminDiary = () => {
    const dataId = localStorage.getItem('dataId')

    const [oneDiary, setOneDiary] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    // Model To Edit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addDiary = (e) => {
        e.preventDefault()
        if (dataId) {
            PostData(`/api/v1/diary/${dataId}`, { name, link }).then(res => {
                notify('Add Your Diray Successfully', 'success')
                res.data.data && setOneDiary(res.data.data)
                getAllDiary()
            }).catch(err => {
                notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
                setErrorMsg(err.response.data.msg)
            });
        } else {
            notify(`Add Personal Data First`, 'error')
        }
    }

    const getAllDiary = () => {
        if (dataId) {
            GetData(`/api/v1/userInfo/${dataId}`).then(res => {
                res.data.data && setOneDiary(res.data.data)
            }).catch(err => {
                notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
                setErrorMsg(err.response.data.msg)
            });
        }
    }

    const deleteDiary = (id) => {
        if (dataId) {
            DeleteData(`/api/v1/diary/${dataId}`, { docId: id }).then(res => {
                notify('Delete Your Diray Successfully', 'success')
                res.data.data && setOneDiary(res.data.data)
                getAllDiary()
            }).catch(err => {
                notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
                setErrorMsg(err.response.data.msg || err.response.data.message)
            });
        }
    }

    const updateDiary = (id) => {
        if (dataId) {
            EditData(`/api/v1/diary/${dataId}`, { docId: id, name, link }).then(res => {
                notify('Update Your Diray Successfully', 'success')
                res.data.data && setOneDiary(res.data.data)
                getAllDiary()
                handleClose()
            }).catch(err => {
                notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
                setErrorMsg(err.response.data.msg || err.response.data.message)
            });
        }
    }

    const handleUpdate = (name, link) => {
        handleShow()
        setName(name)
        setLink(link)
    }

    useEffect(() => {
        getAllDiary()
    }, [])

    return (
        <Row className='adminDiary'>
            <SdebarAdmin />
            <Col sm={9} className='right ps-5'>
                <div className="form-container">
                    <form className="form" >
                        <div className="form-group">
                            <Row className='align-items-end mb-4'>
                                <Col sm={4}>
                                    <label for="name">Diary Name: </label>
                                    <div className='d-flex gap-2 mb-2'>
                                        <input required="" name="name" id="name" type="text" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </Col>
                                <Col sm={5}>
                                    <label for="link">Diary Link: </label>
                                    <div className='d-flex gap-2 mb-2'>
                                        <input required="" name="link" id="link" type="text" onChange={(e) => setLink(e.target.value)} />
                                    </div>
                                </Col>
                                <Col sm={3} className='mb-2'>
                                    <ButtonGlitch name={'Add'} width='100%' handle={(e) => addDiary(e)} />
                                </Col>
                            </Row>
                        </div>
                    </form>
                </div>
                {
                    dataId ?
                        oneDiary && oneDiary.diary ?
                            oneDiary.diary.length !== 0 ?
                                (
                                    oneDiary.diary.map((res) => {
                                        return (
                                            <div className='main-bg rounded-4 p-4 mb-3' key={res._id}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <p><span className='color'>Name:</span> {res.name || 'Fuck U'}</p>
                                                    <div>
                                                        {/* Model To Edit */}
                                                        <Modal show={show} onHide={handleClose} data-bs-theme="dark">
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Update {res.name}</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <div className="form-container">
                                                                    <form className="form" >
                                                                        <div className="form-group">
                                                                            <label for="name">Diary Name: </label>
                                                                            <div className='d-flex gap-2 mb-2'>
                                                                                <input value={name} name="name" id="name" type="text" onChange={(e) => setName(e.target.value)} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label for="link">Diary Link: </label>
                                                                            <div className='d-flex gap-2 mb-2'>
                                                                                <input value={link} name="link" id="link" type="text" onChange={(e) => setLink(e.target.value)} />
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="danger" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="success" onClick={() => updateDiary(res._id)}>
                                                                    Update
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                        {/* Model To Edit */}
                                                        <Button variant='success' onClick={() => handleUpdate(res.name, res.link)}>Update</Button> {" "}
                                                        <Button variant='danger' onClick={() => deleteDiary(res._id)}>Delete</Button>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className=' p-0 m-0 rounded-5 overflow-hidden'>
                                                    <iframe width="100%" height="300" src={getEmbedUrl(res.link)} title="YouTube video player" frameborder="0" allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) :
                                <div className='d-flex justify-content-center fs-3 fw-bold text-effect'>{errorMsg || 'There is no Diary'}</div>
                            :
                            <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                        :
                        <div className='d-flex justify-content-center fs-3 fw-bold text-effect'>{errorMsg || 'Add Personal Data First :)'}</div>
                }
            </Col>
            <ToastContainer />
        </Row>
    )
}

export default AdminDiary
