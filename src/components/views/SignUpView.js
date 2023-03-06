import { Link } from "react-router-dom";

const SignUpView = (props) => {
    <div className="root">
        <div className="formContainer">
            <div className="formTitle">
                <h2 style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                    Sign Up
                </h2>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
                <input type="text" name="email" onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>

                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Password: </label>
                <input type="password" name="password" onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
            </form>
        </div>
        <Link to={"/"}>
            <p>Back</p>
        </Link>
    </div>
}

export default SignUpView;