import react from 'react';
import { MyPageUserInfo } from '../components';
import Cookies from 'js-cookie';


const Mypage: React.FC = () => {

    const checkCookieIsExist = () => {
        let cookie = Cookies.get('isLoggined');

        if (cookie === undefined || cookie === null || cookie === '') {
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/login';
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            {checkCookieIsExist() && <MyPageUserInfo />}
        </>
    )
}

export default Mypage;