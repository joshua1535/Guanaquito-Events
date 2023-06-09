import logo from '../../../assets/logo.png';
import classes from './EmailConfirmationForm.module.css';
import imgtemplate from '../../../assets/loginimg.png';
import { useNavigate } from 'react-router-dom';


const EmailConfirmationForm = () => {

    const navigate = useNavigate();

    const confirmationHandler = () => {
        navigate('/updatepassword');
    };

    return (
        <div className={classes["generalContainer"]}>
            <div className={classes["inputsContainer"]} >
            <img className= {classes["logoImg"]} src={logo} />
            <h1 className={classes["logintitle"]}>Guanaco Business</h1>
            <h1 className={classes["infotext"]}>
                Escribe tu correo para confirmar tu identidad 
                y puedas recuperar tu contraseña.
                </h1>
            <div className={classes["inputemailContainer"]}>
                <input className={classes["inputformat"]} type="text" placeholder="Correo electronico" />
            </div>

           <div className={classes["loginContainer"]}>

           <button 
           onClick={confirmationHandler}
           className={classes["buttonlogin"]}>
                Enviar
            </button>        

            </div>
            </div>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
             </div>
        

    )
}

    export default EmailConfirmationForm;
