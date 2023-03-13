import './index.scss'
import LogoTitle from '../../assets/images/logo-o.png'
import { Link } from 'react-router-dom';

const Login = () => {


    return (
        <>
            <div className='loginContainer'>
                <div className='loginForm'>
                   <h2 className='loginText'>Login</h2>
                   <div className='loginBox'>
                    <label style={{ fontSize: 15 }}>Email</label><br/>
                    <input type="email" className='emailBox'></input><br/>
                    <label style={{ fontSize: 15 }}>Password</label><br/>
                    <input type="password" className='passwordBox'></input><br/>
                    <input className='rememberMe' type="checkbox" id='rememberMe'></input>
                    <label style={{ fontSize: 15 }} for='rememberMe'>Remember Me</label><br/>
                    <input className='signInButton'type="button" value='Sign in'></input>
                    <p className='signUpText'style={{fontSize: 15}}>Don't have an account? <Link style={{fontSize: 15}} to='/SignUp'>Sign Up</Link></p>
                   </div>
                </div>
            </div>
        </>
    )
}

export default Login;