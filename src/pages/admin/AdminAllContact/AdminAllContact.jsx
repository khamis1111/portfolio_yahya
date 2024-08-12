import React, { useEffect, useState } from 'react'
import { Button, Col, Row, ToastContainer } from 'react-bootstrap'
import Loader from '../../../utils/Loader/Loader'
import SdebarAdmin from '../../../utils/SidebarAdmin'
import { GetData } from '../../../api/Axios/useGetData'
import { DeleteData } from '../../../api/Axios/useDeleteData'
import { DateFormate } from '../../../utils/DateFormate'
import notify from '../../../utils/useToastify'
import Pagination from '../../../utils/Pagination'
import { limitOfItems } from '../../..'

const AdminAllContact = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [allContact, setAllContact] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const getAllContact = () => {
        GetData(`/api/v1/contact`).then(res => {
            res.data && setAllContact(res.data)
            setDataLoading(true)
        }).catch(err => {
            setErrorMsg(err.response.data.msg)
        });
    }

    const deleteContact = (id) => {
        DeleteData(`/api/v1/contact/${id}`).then(res => {
            res.data && setAllContact(res.data)
            getAllContact()
        }).catch(err => {
            setErrorMsg(err.response.data.msg || err.response.data.message)
        });
    }

    useEffect(() => {
        getAllContact()
    }, [])

    const getPage = (page) => {
        GetData(`/api/v1/contact?limit=${limitOfItems}&page=${page}`).then(res => {
            res.data && setAllContact(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    return (
        <Row className='adminContact'>
            <SdebarAdmin />
            <Col sm={9} className='right ps-5'>
                {
                    dataLoading ?
                        allContact.data && allContact.data.length !== 0 ?
                            (
                                allContact.data.map((res) => {
                                    return (
                                        <div className='main-bg rounded-4 p-4 mb-3' key={res._id}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <p><span className='color'>Name:</span> {res.name}</p>
                                                <Button variant='danger' onClick={() => deleteContact(res._id)}>Delete</Button>
                                            </div>
                                            <hr />
                                            <p className='mb-1'><span className='color'>Email:</span> {res.email}</p>
                                            <p className='mb-1'><span className='color'>Message:</span> {res.message}</p>
                                            <p className='mb-1'><span className='color'>Send At:</span> {DateFormate(res.createdAt)}</p>
                                        </div>
                                    )
                                })
                            ) :
                            <div className='d-flex justify-content-center fs-3 fw-bold text-effect'>{errorMsg || 'There is no Contact Message'}</div>
                        :
                        <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                }

                {
                    allContact.data && allContact.paginationResult.noOfPages > 1 &&
                    <Pagination getPage={getPage} pageCount={allContact.data && allContact.paginationResult.noOfPages} />
                }
            </Col>
            <ToastContainer />
        </Row>
    )
}

export default AdminAllContact
