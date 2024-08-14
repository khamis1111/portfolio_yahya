import TitleCard from '../../../components/TitleCard/TitleCard'
import { Col, Row } from 'react-bootstrap'
import Loader from '../../../utils/Loader/Loader'
import { getEmbedUrl } from '../../../utils/GetEmbedUrl'

const DiaryPage = ({ allData, dataLoading }) => {

    return (
        <div className='main-bg1 rounded-5'>
            <TitleCard name={'Scotland_Diary'} />
            <Row>
                <Col sm={12} className='d-flex justify-content-center flex-wrap gap-2'>
                    {
                        dataLoading ?
                            allData.data && allData.data.length > 0 && allData.data[0].diary.length !== 0 ?
                                (
                                    allData.data[0].diary.map((res) => {
                                        return (
                                            <div className=' p-0 m-0 rounded-5 overflow-hidden' key={res._id}>
                                                <iframe width="490" height="300" src={getEmbedUrl(res.link)} title={res.name || "YouTube video player"} frameborder="0" allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                            </div>
                                        )
                                    })
                                ) :
                                <div className='d-flex justify-content-center fs-3 fw-bold text-effect text-center'>{'There is no Diary Right Now !'}</div>
                            :
                            <div className='d-flex justify-content-center'><Loader name={'Loading...'} /></div>
                    }
                </Col>

            </Row>
        </div>
    )
}

export default DiaryPage