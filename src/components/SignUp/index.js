import './index.scss'
import LogoTitle from '../../assets/images/logo-o.png'
import { Link } from 'react-router-dom';

const SignUp = () => {


    return (
        <>
            <div className='signUpContainer'>
                <div className='signUpForm'>
                   <h2 className='signUpText'>Sign Up</h2>
                   <div className='signUpBox'>
                    <label style={{ fontSize: 15 }}>Email</label><br/>
                    <input type="email" className='emailBox'></input><br/>
                    <label style={{ fontSize: 15 }}>Password</label><br/>
                    <input type="password" className='passwordBox'></input><br/>
                    <label style={{ fontSize: 15 }}>Confirm Password</label><br/>
                    <input type="password" className='passwordBox'></input><br/>
                    <input className='signUpButton' type="button" value='Create Account'></input>
                    <p className='loginText' style={{fontSize: 15}}>Already have an account? <Link style={{fontSize: 15}} to='/Login'>Login</Link></p>
                   </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;