import Loader from '../../utils/Loader/Loader'
import './PageLoader.css'

const PageLoader = ({ dataLoading }) => {

    return (
        <div>
            {
                !dataLoading || !localStorage.getItem('dataId') ? <div className='page-loader'><Loader name={'Loading...'} /></div> : null
            }
        </div>
    )
}

export default PageLoader
