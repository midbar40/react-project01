import react from 'react';
import { MyPageUserInfo } from '../components';
import { useAuthStore } from '../stores/AuthStore';


const Mypage: React.FC = () => {

    const checkCookieIsExist = () => {
        const { cookies } = useAuthStore();
        if (!cookies || cookies === '' || cookies === undefined || cookies === null) {
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/login';
            return false;
        } else {
            return true;
        }
    }
    return (
        <>{checkCookieIsExist() && <MyPageUserInfo />}</>
    )
}

export default Mypage;