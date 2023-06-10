import logo from '../../assets/logo.png';
import './LoginForm.module.css';
import classes from './LoginForm.module.css';
import imgtemplate from '../../assets/loginimg.png';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

    const navigate = useNavigate();

    const signinHandler = () => {
        navigate('/home');
    };

    const forgotpasswordHandler = () => {
        navigate('/emailconfirmation');
    };

    const registerHandler = () => {
        navigate('/emailregister');
    };


    
    return (
        <div className={classes["generalContainer"]}>
            <div className={classes["inputsContainer"]} >
            <img className= {classes["logoImg"]} src={logo} />
            <h1 className={classes["logintitle"]}>Guanaco Business</h1>
            <h1 className={classes["logintitle2"]}>Iniciar sesión</h1>
            <div className={classes["inputemailContainer"]}>
                <p className={classes["inputemailTitle"]} > Correo electronico</p>
                <input className={classes["inputformat"]} type="text" placeholder="Ej. danyfifitax@gmail.com" />
            </div>
            <div className={classes["inputpasswordContainer"]}>
                <p className={classes["inputpasswordTitle"]} > Contraseña</p>
                <input className={classes["inputformat"]} type="password" placeholder="*****************" />
                <div className={classes["inputOptionsContainer"]}>
                    <input type="checkbox" class="form-checkbox"/>
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
            onClick={signinHandler}
           className={classes["buttonlogin"]}>
                Iniciar sesión
            </button>            

            <button 
            onClick={registerHandler}
            className={classes["buttonlogingoogle"]}>
                <img className={classes["imgbuttonlogingoogle"]} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span>Iniciar sesion con Google</span>
            </button>

            </div>
            </div>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
            </div>
        

    )
}

    export default LoginForm;
