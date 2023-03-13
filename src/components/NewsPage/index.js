import './index.scss'
import LogoTitle from '../../assets/images/logo-o.png'
import { Link } from 'react-router-dom';

const NewsPage = () => {


    return (
        <>
            <div className='newsContainer'>
                <div className='barButton'>
                   <input className='recentButton' type='button' value='Recent'></input>
                </div>
            </div>
        </>
    )
}

export default NewsPage;