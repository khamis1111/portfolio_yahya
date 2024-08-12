import Loader from '../../utils/Loader/Loader'
import './PageLoader.css'

const PageLoader = ({ dataLoading }) => {

    return (
        <div>
            {
                !dataLoading && <div className='page-loader'><Loader name={'Loading...'} /></div>
            }
        </div>
    )
}

export default PageLoader
