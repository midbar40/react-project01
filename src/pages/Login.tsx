import react from 'react';
import { Header, LoginForm } from '../components';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <>
            <div className="main">
                <Header />
                <LoginForm />
            </div>
        </>
    )
}

export default Login;