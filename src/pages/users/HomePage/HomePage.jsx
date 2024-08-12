import React, { useEffect, useRef, useState } from 'react'
import TitleName from '../../../components/TitleName/TitleName'
import fire from "../../../videos/Fire.mp4"
import BestVideo from '../../../components/BestVideo/BestVideo'
import { GetData } from '../../../api/Axios/useGetData'
import notify from '../../../utils/useToastify'
import ReelsSection from '../../../components/ReelsSection/ReelsSection'

const HomePage = ({ allData }) => {
    const [dataLoading, setDataLoading] = useState(false);
    const [allWork, setAllWork] = useState([]);
    const vidRef = useRef();

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

    return (
        <div className='main-cover1'>
            <video loop autoPlay={"autoplay"} muted ref={vidRef} src={fire} id="background-video" className="main-video"></video>
            <TitleName allData={allData} />
            <BestVideo allData={allData} allWork={allWork} dataLoading={dataLoading} />
        </div>
    )
}
export default HomePage