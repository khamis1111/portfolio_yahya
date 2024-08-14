import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SdebarAdmin = () => {
    return (
        <Col sm={3} className='left shadow-sm rounded-4 p-3 d-flex flex-column align-items-center gap-3 h-100'>
            <Link to={'/admin'}><p className='border px-4 py-2 shadow'>Personal Data</p></Link>
            <Link to={'/admin/work'}><p className='border px-4 py-2 shadow'>Work Videos</p></Link>
            {/* <Link to={'/admin/diary'}><p className='border px-4 py-2 shadow'>Diary Youtube</p></Link> */}
            <Link to={'/admin/addReels'}><p className='border px-4 py-2 shadow'>Add Reels</p></Link>
            <Link to={'/admin/allWork'}><p className='border px-4 py-2 shadow'>All Work Videos</p></Link>
            <Link to={'/admin/allContact'}><p className='border px-4 py-2 shadow'>All Contacts</p></Link>
            <Link to={'/admin/reels'}><p className='border px-4 py-2 shadow'>All Reels</p></Link>
        </Col>
    )
}

export default SdebarAdmin
