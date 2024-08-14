import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import SdebarAdmin from '../../../utils/SidebarAdmin'
import { Link } from 'react-router-dom'
import { limitOfItems } from '../../..'
import notify from '../../../utils/useToastify'
import { GetData } from '../../../api/Axios/useGetData'
import { DeleteData } from '../../../api/Axios/useDeleteData'
import Loader from '../../../utils/Loader/Loader'
import './AdminReels.css'
import Pagination from '../../../utils/Pagination'
import { getIdEmbedUrl } from '../../../utils/GetEmbedUrl'

const AdminReels = () => {
    const [allReels, setAllReels] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const getAllReels = () => {
        GetData(`/api/v1/reels?limit=${limitOfItems}`).then(res => {
            res.data && setAllReels(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    const handleDeleteReels = (e, id) => {
        e.preventDefault()
        DeleteData(`/api/v1/reels/${id}`).then(res => {
            notify('Delete Your Reels Successfully', 'success')
            getAllReels()
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    useEffect(() => {
        getAllReels()
    }, [])

    const getPage = (page) => {
        GetData(`/api/v1/reels?limit=${limitOfItems}&page=${page}`).then(res => {
            res.data && setAllReels(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    return (
        <Row className='adminAllReels'>
            <SdebarAdmin />
            <Col sm={9} className='right'>
                <Row>
                    <Col sm={12} className='d-flex justify-content-center flex-wrap gap-3'>
                        {
                            dataLoading ?
                                allReels.data && allReels.data.length !== 0 ?
                                    (
                                        allReels.data.map((res) => {
                                            return (
                                                <div className='reels-card'>
                                                    <Link to={`/reel/${res._id}`}>
                                                        <div className='video-card text-center video-container' style={{ width: '220px', height: '450px' }}>
                                                            <img
                                                                src={`https://img.youtube.com/vi/${getIdEmbedUrl(res.reelsVideo)}/hqdefault.jpg`}
                                                                alt={res.name}
                                                            />
                                                            <div className='video-content'>
                                                                <p className='text-center text-wrap'>{res.name}</p>
                                                                <div>{res.likes} Likes</div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className="control-btn d-flex justify-content-between">
                                                        <Button variant='danger' onClick={(e) => handleDeleteReels(e, res._id)}>Delete</Button>
                                                        <Link to={`/admin/updateReels/${res._id}`}>
                                                            <Button variant='success'>Update</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                    <div className='d-flex justify-content-center fs-3 fw-bold text-effect text-center'>{'There is no Reels Videos'}</div>
                                :
                                <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                        }

                    </Col>
                    {
                        allReels.data && allReels.paginationResult.noOfPages > 1 &&
                        <Pagination getPage={getPage} pageCount={allReels.data && allReels.paginationResult.noOfPages} />
                    }
                </Row>
            </Col>
        </Row >
    )
}

export default AdminReels
