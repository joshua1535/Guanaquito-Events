import logo from '../../../assets/logo.png';
import classes from './PasswordConfirmationForm.module.css';
import imgtemplate from '../../../assets/loginimg.png';


const PasswordConfirmationForm = () => {
    return (
        <div className={classes["generalContainer"]}>
            <div className={classes["inputsContainer"]} >
            <img className= {classes["logoImg"]} src={logo} />
            <h1 className={classes["logintitle"]}>Guanaco Business</h1>
            <h1 className={classes["infotext"]}>
            Debe contener entre 8 y 20 caracteres, 
            y debe incluir al menos un número (0-9), 
            mayúscula y caracter especial (_?!-)
                </h1>
            <div className={classes["inputemailContainer"]}>
                <p className={classes["inputemailTitle"]} > Contraseña</p>
                <input className={classes["inputformat"]} type="password" placeholder="*****************" />
                <p className={classes["inputemailTitle"]} > Vuelve a escribir la contraseña</p>
                <input className={classes["inputformat"]} type="password" placeholder="*****************" />
            </div>

           <div className={classes["loginContainer"]}>

           <button className={classes["buttonlogin"]}>
                Continuar
            </button>        

            </div>
            </div>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
             </div>
        

    )
}

    export default PasswordConfirmationForm;
