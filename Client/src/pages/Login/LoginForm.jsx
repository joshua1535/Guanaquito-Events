import logo from '../../assets/logo.png';
import './LoginForm.module.css';
import classes from './LoginForm.module.css';
import imgtemplate from '../../assets/loginimg.png';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../Context/userContext';
import { useState } from 'react';
import { useEffect } from 'react';

const LoginForm = () => {

    const navigate = useNavigate();

    const { login, token } = useUserContext();

    useEffect(() => {
        if (token) {
            return navigate('/home')
        }
    });

    const signinHandler = () => {
        navigate('/home');
    };

    const forgotpasswordHandler = () => {
        navigate('/emailconfirmation');
    };

    
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        const logged = await login(identifier, password);

        setError(!logged);
    
        setIdentifier("");
        setPassword("");

    }
    

    const registerHandler = (e) => {
        
        e.stopPropagation();
        navigate('/register');
    
    };


    return (
        <div className={classes["generalContainer"]}>
            <form onSubmit={onSubmitHandler}>
                <div className={classes["inputsContainer"]} >
                    <img className={classes["logoImg"]} src={logo} />
                    <h1 className={classes["logintitle"]}>Guanaco Business</h1>
                    <h1 className={classes["logintitle2"]}>Iniciar sesión</h1>
                    <div className={classes["inputemailContainer"]}>
                        <p className={classes["inputemailTitle"]} > Correo electronico</p>
                        <input 
                            className={classes["inputformat"]}
                            value={identifier} 
                            type="text" 
                            placeholder="Ej. danyfifitax@gmail.com"
                            onChange={(e) => onChange(e, setIdentifier)} />
                    </div>
                    <div className={classes["inputpasswordContainer"]}>
                        <p className={classes["inputpasswordTitle"]} > Contraseña</p>
                        <input 
                            className={classes["inputformat"]}
                            value={password}
                            type="password" 
                            placeholder="*****************"
                            onChange={(e) => onChange(e, setPassword)}/>
                        <div className={classes["inputOptionsContainer"]}>
                            <input type="checkbox" class="form-checkbox" />
                            <p className={classes["rememberMeTitle"]} >Recuerdame</p>
                            <button
                                onClick={forgotpasswordHandler}
                                className={classes["buttonforgotpassword"]} >
                                <p className={classes["forgotpassword"]} > ¿Olvidaste tu contraseña?</p>
                            </button>
                        </div>
                    </div>

                    <div className={classes["loginContainer"]}>

                        <button
                            className={classes["buttonlogin"]}>
                            Iniciar sesión
                        </button>

                        <button
                            type='button'
                            onClick={registerHandler}
                            className={classes["buttonlogingoogle"]}>
                            <span>Registrarse</span>
                        </button>

                    </div>
                </div>
            </form>

            <div className={classes["imgContainer"]} >
                <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
        </div>
        

    )
}

    export default LoginForm;
