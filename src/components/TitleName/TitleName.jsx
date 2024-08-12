import React from 'react'
import { Col, Row } from 'react-bootstrap'
import banner from '../../images/main-img1.png'
import './TitleName.css'

const TitleName = ({ allData }) => {

    return (
        <Row className="main-bg1 rounded-5 mb-5 align-items-center">
            <Col sm={6} className='title-name'>
                {/* <p className="fw-bold fs-4 m-0 p-0 ">I'm ,</p> */}
                {
                    allData.data && allData.data.length > 0 ? (
                        <>
                            <p className="my-name p-0 fw-bold text-effect">
                                <div className='text-uppercase'>{allData.data[0].name.split(' ')[0]}</div>
                                <div className='text-uppercase'>{allData.data[0].name.split(' ')[1]}</div>
                            </p>
                            <p className='fs-5 color font-monospace'>[ {allData.data && allData.data[0].career} ]</p>
                        </>
                    ) : <div className='text-uppercase fs-3'>Name And Career</div>
                }
            </Col>
            <Col sm={6} className='d-flex justify-content-center'>
                <img src={banner} alt="video-editor" width={250} height={250} className='my-banner' />
            </Col>
        </Row>
    )
}

export default TitleName
