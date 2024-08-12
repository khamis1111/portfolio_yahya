import TitleCard from '../../../components/TitleCard/TitleCard'
import { Col, Row } from 'react-bootstrap'
import "./BiographyPage.css"

const BiographyPage = ({ allData }) => {

    return (
        <div className='main-bg1 rounded-5 '>
            <TitleCard name={'BIOGRAPHY'} />
            <Row className='justify-content-center'>
                <Col sm={5}>
                    {
                        allData.data && allData.data.length > 0 && (
                            <>
                                <img className='img-profile rounded-5' src={allData.data[0].imgProfile} alt={allData.data[0].nameProfile} width='100%' />
                            </>
                        )
                    }
                </Col>
                <Col sm={6} className='content-profile'>
                    {
                        allData.data && allData.data.length > 0 && (
                            <>
                                <p className='color fs-4 mb-4 fw-bold text-effect text-uppercase'>{allData.data[0].nameProfile}</p>

                            </>
                        )
                    }
                    <p>
                        As a dedicated film editor, I bring stories to life through meticulous editing and creative vision. <br /><br />
                        Proficient in Adobe Premiere Pro, After Effects, Photoshop, and Audition, I transform raw footage into compelling narratives. <br /><br />
                        With a keen eye for detail and a passion for visual storytelling, I specialize in editing films, weddings, commercials, real estate videos, content for creators, and concert footage. <br /><br />
                        My expertise spans across various genres, ensuring each project meets the highest standards of quality and artistic expression. <br /><br />
                        Let's create something extraordinary together. <br /><br />

                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default BiographyPage