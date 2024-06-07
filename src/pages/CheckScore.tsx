import React from 'react';
import { Header, UserCheckForm } from '../components';

export const CheckScore : React.FC = () => {
    return(
        <div className="main">
            <Header />
            <UserCheckForm />
        </div>
    )
}

export default CheckScore;