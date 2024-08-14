import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TitleCard from '../../../components/TitleCard/TitleCard'
import { GetData } from '../../../api/Axios/useGetData'
import notify from '../../../utils/useToastify'
import Loader from '../../../utils/Loader/Loader'
import Pagination from '../../../utils/Pagination'
import { limitOfItems } from '../../..'

const WordPage = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [allWork, setAllWork] = useState([]);

    const getAllWork = () => {
        GetData(`/api/v1/work`).then(res => {
            const myData = res.data
            setAllWork(myData)
            setDataLoading(true)
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
        <div className='main-bg1 rounded-5 '>
            <TitleCard name={'WORK'} />
            <Row>
                <Col sm={12} className='d-flex justify-content-center flex-wrap gap-3'>
                    {
                        dataLoading ?
                            allWork.data && allWork.data.length !== 0 ?
                                (
                                    allWork.data.map((res) => {
                                        return (
                                            <Link to={`/work/${res._id}`} key={res._id}>
                                                <div className='video-card text-center' style={{ width: '320px' }}>
                                                    <img src={res.imgCover} alt={res.name} />
                                                    <div className='video-content'>{res.name}</div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) :
                                <div className='d-flex justify-content-center fs-3 fw-bold text-effect text-center'>{'There is no Work Videos Right Now !'}</div>
                            :
                            <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                    }
                </Col>
                {
                    allWork.data && allWork.paginationResult.noOfPages > 1 &&
                    <Pagination getPage={getPage} pageCount={allWork.data && allWork.paginationResult.noOfPages} />
                }
            </Row>
        </div>
    )
}

export default WordPage