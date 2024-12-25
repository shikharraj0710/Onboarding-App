/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome, {user.credentials?.username}!</h1>
                <p className={styles.text}>
                    You have successfully completed the onboarding process.
                </p>
                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
