import './LoginForm.module.css';
import classes from './LoginForm.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';


const LoginForm = () => {
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
                    <p className={classes["forgotpassword"]} > ¿Olvidaste tu contraseña?</p>
                </div>
            </div>

           <div className={classes["loginContainer"]}>

           <button className={classes["buttonlogin"]}>
                Iniciar sesión
            </button>            

            <button className={classes["buttonlogingoogle"]}>
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