import React, { useEffect, useState } from 'react';
import { limitOfItems } from '../..';
import { GetData } from '../../api/Axios/useGetData';
import notify from '../../utils/useToastify';
import { Link } from 'react-router-dom';
import Loader from '../../utils/Loader/Loader';
import './ReelsSection.css'
import TitleCard from '../TitleCard/TitleCard';
import { Col, Row } from 'react-bootstrap';
import Pagination from '../../utils/Pagination';
import { getIdEmbedUrl } from '../../utils/GetEmbedUrl';

const ReelsSection = () => {
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

    const getPage = (page) => {
        GetData(`/api/v1/reels?limit=${limitOfItems}&page=${page}`).then(res => {
            res.data && setAllReels(res.data)
            setDataLoading(true)
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAllReels()
        }
        fetchData()
    }, []);

    return (
        <>
            <TitleCard name={'Reels_Videos'} />

            <Row>
                <Col sm={12} className='d-flex justify-content-center flex-wrap gap-3'>
                    {
                        dataLoading ?
                            allReels.data && allReels.data.length !== 0 ?
                                (
                                    allReels.data.map((res) => {
                                        return (
                                            <div className='reels-card rounded-5 overflow-hidden '>
                                                <Link to={`/reel/${res._id}`}>
                                                    <div className='video-card text-center video-container' style={{ width: '230px', height: '500px' }}>
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
        </>
    )
}

export default ReelsSection
