import Loader from '../../utils/Loader/Loader'
import './PageLoader.css'

const PageLoader = ({ dataLoading }) => {

    return (
        <div>
            {
                localStorage.getItem('dataId') !== null &&
                    !dataLoading ? <div className='page-loader'><Loader name={'Loading...'} /></div> : null
            }
        </div>
    )
}

export default PageLoader
