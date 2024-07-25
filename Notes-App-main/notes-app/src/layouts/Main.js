import React, { Suspense,useEffect } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';
import Loader from '../components/shared/loader';
import Sidebar from '../components/shared/sidebar';
import Navbar from '../components/shared/navbar';
import utils from '../utils/localstorage';

function Main(){
    const navigate=useNavigate();
    useEffect(()=>{
        const AuthKey=utils.getFromLocalStorage("auth_key");
        if(!AuthKey) navigate("/");
    },[])

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loader/>}>
                {/* SideBar */}
                <Sidebar/>
                <div className={styles.main}>
                    {/* NavBar */}
                    <Navbar/>
                    <section className={styles.content}>
                        <Outlet/>
                    </section>
                </div>
            </Suspense>
        </main>
    );
};

export default Main;