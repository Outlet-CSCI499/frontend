import { Link } from 'react-router-dom';

const HomePageView = () => {
    return (
        <div>
            <h1>Welcome !</h1>
            <Link to={"/"}>
            <   p>Back</p>
            </Link>
        </div>
    );
}

export default HomePageView;