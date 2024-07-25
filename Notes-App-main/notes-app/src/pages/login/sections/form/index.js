import React, { useState } from 'react';

import BrandLogo from "../../../../components/shared/brand";
import styles from './form.module.scss';
import Signin from '../../partials/signin';
import Signup from '../../partials/signup';

function Form() {
    const [active, setActive] = useState('signin');

    return (
        <section className={styles['form-container']}>
            <BrandLogo />
            {active === 'signin' ? <Signin /> : <Signup handleSwitch={() => setActive("signin")} />}
            {active === "signin" ?
                <p>Not a registered user? <span onClick={() => setActive("signup")}>Sign Up Now</span></p>
                :
                <p>Already have an account? <span onClick={() => setActive("signin")}>Sign In</span></p>
            }
        </section>
    );
}

export default Form;
