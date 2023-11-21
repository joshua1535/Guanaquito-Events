import logo from '../../assets/logo.png';
import './RegisterForm.module.css';
import classes from './RegisterForm.module.css';
import imgtemplate from '../../assets/loginimg.png';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useUserContext } from '../../Context/userContext'

const RegisterForm = () => {

    const navigate = useNavigate();

    const loginHandler = () => {
        navigate('/');
    };

    const { signup } = useUserContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        /* console.log("email: " + email);
        console.log("password: " + password); */
        const registered = await signup(email, password, "https://i.seadn.io/gae/_9to9M96e2o7mE1U1o0oaPQ2s03Y3RSsm6Kubz9k9D4mwC2_oYDpIKTDATidGJv_X9JRyfFf3BnUBrIhoLXCcPzmqVK7z6fWujHz7-8?auto=format&dpr=1&w=1000");
        /* console.log(registered);
        console.log("registered"); */
        setError(!registered);
    
        if(registered) {
            //navigate('/emailregister');
            navigate('/');
        }

        setEmail("");
        setPassword("");

    }

    return (
        <div className={classes["generalContainer"]}>
            <form onSubmit={onSubmitHandler}>
                <div className={classes["inputsContainer"]} >
                    <img className= {classes["logoImg"]} src={logo} />
                    <h1 className={classes["logintitle"]}>Guanaco Business</h1>
                    <h1 className={classes["logintitle2"]}>Registrate</h1>
                    <div className={classes["inputemailContainer"]}>
                        <p className={classes["inputemailTitle"]} > Correo electronico</p>
                        <input className={classes["inputformat"]} 
                            type="text" 
                            value={email} 
                            placeholder="Ej. danyfifitax@gmail.com"
                            onChange={(e) => onChange(e, setEmail)}
                            />
                    </div>
                    <div className={classes["inputpasswordContainer"]}>
                        <p className={classes["inputpasswordTitle"]} > Contraseña</p>
                        <input className={classes["inputformat"]} 
                        type="password" 
                        value={password}
                        placeholder="*****************" 
                        onChange={(e) => onChange(e, setPassword)}
                        />
                    </div>

                    <div className={classes["loginContainer"]}>

                    <button type="submit" className={classes["buttonlogin"]}>
                        Crear cuenta
                    </button>        

                    </div>
                </div>
            </form>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
            </div>
        
    )
}

    export default RegisterForm;
