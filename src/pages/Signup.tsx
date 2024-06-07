import react from 'react';
import { Header, SignUpForm } from '../components';

const Signup: React.FC = () => {
    return (
        <div className="main">
            <Header />
            <SignUpForm />
        </div>
    )
}

export default Signup;