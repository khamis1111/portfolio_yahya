import React, { useState } from 'react'
import TitleCard from '../../../components/TitleCard/TitleCard'
import { Col, Row } from 'react-bootstrap'
import ButtonGlitch from '../../../utils/ButtonGlitch/ButtonGlitch'
import "./ContactPage.css"
import { PostData } from '../../../api/Axios/usePostData'
import notify from '../../../utils/useToastify'

const ContactPage = ({ allData }) => {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const addDiary = (e) => {
        setLoading(true)
        e.preventDefault()
        PostData(`/api/v1/contact`, { name, email, message }).then(res => {
            notify('Your message has been sent successfully', 'success')
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        });
    }

    return (
        <div className='main-bg1 rounded-5 '>
            <TitleCard name={'CONTACT_US'} />
            <Row>
                <Col sm={6}>
                    <div className="form-container">
                        <form className="form" >
                            <div className="form-group">
                                <label for="name">Your Name</label>
                                <input required="" name="name" id="name" type="text" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="email">Your Email</label>
                                <input required="" name="email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="textarea">How Can I Help You?</label>
                                <textarea required="" cols="50" rows="10" id="textarea" name="textarea" onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <ButtonGlitch name={'Send'} handle={(e) => addDiary(e)} loading={loading} />
                        </form>
                    </div>
                </Col>
                <Col sm={6} className='text-contact d-flex justify-content-center align-items-center flex-column gap-2'>
                    <p>Based in <span className='color text-effect fw-normal'>EGYPT</span>.</p>
                    {
                        allData.data && allData.data.length > 0 && (
                            <>
                                <a href={`mailto:${allData.data[0].email}`}>{allData.data[0].email}</a>
                            </>
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ContactPage