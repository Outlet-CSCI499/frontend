import './index.scss'
import LogoTitle from '../../assets/images/logo-o.png'

const Home = () => {


    return (
        <div className='container home-page'>
            <div className='text-zone'>
                <h1>Hello, <br /> Welcome to 
                <img src={LogoTitle} alt="home-logo" />
                utlet
                <br />
                webpage
                </h1>
                <h2>Your home for all your work concerns</h2>
            </div>
        </div>
    )
}

export default Home;