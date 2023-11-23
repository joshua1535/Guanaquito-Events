import logo from '../../../assets/logo.png';
import classes from './EmailConfirmationForm.module.css';
import imgtemplate from '../../../assets/loginimg.jpg';
import {useNavigate} from 'react-router-dom';


const EmailConfirmationFormRegister = () => {

    const navigate = useNavigate();

    const confirmHandler = () => {
        navigate('/passwordconfirmation');
    };

    return (
        <div className={classes["generalContainer"]}>
            <form>
            <div className={classes["inputsContainer"]} >
            <img className= {classes["logoImg"]} src={logo} />
            <h1 className={classes["logintitle"]}>Guanaco Business</h1>
            <h1 className={classes["infotext"]}>
            Escribe el código que te hemos enviado al 
            correo danyfifitax@gmail.com para confirmar tu identidad.
                </h1>
            <div className={classes["inputcodeContainer"]}>
                <p className={classes["inputcodeTitle"]} > Codigo de 8 digitos:</p>
                <input className={classes["inputformat"]} type="text" placeholder="59204" />
            </div>

           <div className={classes["sendContainer"]}>

           <button 
           onClick={confirmHandler}
           className={classes["buttonsend"]}>
                Enviar
            </button> 
            <p className={classes["resendbutton"]} > Reenviar codigo</p>       

            </div>
            </div>
            </form>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
             </div>
        

    )
}

    export default EmailConfirmationFormRegister;
