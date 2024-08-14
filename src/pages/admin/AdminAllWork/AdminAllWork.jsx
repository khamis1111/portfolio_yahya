import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import SdebarAdmin from '../../../utils/SidebarAdmin'
import notify from '../../../utils/useToastify'
import { Link } from 'react-router-dom'
import { GetData } from '../../../api/Axios/useGetData'
import Loader from '../../../utils/Loader/Loader'
import { DeleteData } from '../../../api/Axios/useDeleteData'
import Pagination from '../../../utils/Pagination'
import { limitOfItems } from '../../..'
import './AdminAllWork.css'

const AdminAllWork = () => {
    const [allWork, setAllWork] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const getAllWork = () => {
        GetData(`/api/v1/work?limit=${limitOfItems}`).then(res => {
            res.data && setAllWork(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    const handleDeleteWork = (e, id) => {
        e.preventDefault()
        DeleteData(`/api/v1/work/${id}`).then(res => {
            notify('Delete Your Work Successfully', 'success')
            getAllWork()
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    useEffect(() => {
        getAllWork()
    }, [])

    const getPage = (page) => {
        GetData(`/api/v1/work?limit=${limitOfItems}&page=${page}`).then(res => {
            res.data && setAllWork(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }
    return (
        <Row className='adminAllWork'>
            <SdebarAdmin />
            <Col sm={9} className='right'>
                <Row>
                    <Col sm={12} className='d-flex justify-content-center flex-wrap gap-3'>
                        {
                            dataLoading ?
                                allWork.data && allWork.data.length !== 0 ?
                                    (
                                        allWork.data.map((res) => {
                                            return (
                                                <div className='work-card'>
                                                    <Link to={`/work/${res._id}`}>
                                                        <div className='video-card text-center' style={{ width: '335px' }}>
                                                            <img src={res.imgCover} alt="" className='' />
                                                            <div className='video-content'>{res.name}</div>
                                                        </div>
                                                    </Link>
                                                    <div className="control-btn d-flex justify-content-between">
                                                        <Button variant='danger' onClick={(e) => handleDeleteWork(e, res._id)}>Delete</Button>
                                                        <Link to={`/admin/updateWork/${res._id}`}>
                                                            <Button variant='success'>Update</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                    <div className='d-flex justify-content-center fs-3 fw-bold text-effect text-center'>{'There is no Work Videos'}</div>
                                :
                                <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                        }

                    </Col>
                    {
                        allWork.data && allWork.paginationResult.noOfPages > 1 &&
                        <Pagination getPage={getPage} pageCount={allWork.data && allWork.paginationResult.noOfPages} />
                    }
                </Row>
            </Col>
        </Row >
    )
}

export default AdminAllWork
