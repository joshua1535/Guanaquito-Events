import logo from '../../../assets/logo.png';
import classes from './UpdatePasswordForm.module.css';
import imgtemplate from '../../../assets/loginimg.jpg';
import { useNavigate } from 'react-router-dom';


const UpdatePasswordForm = () => {

    const navigate = useNavigate();

    const updateHandler = () => {
        navigate('/');
    };

    return (
        
        <div className={classes["generalContainer"]}>
            <form>
            <div className={classes["inputsContainer"]} >
            <img className= {classes["logoImg"]} src={logo} />
            <h1 className={classes["logintitle"]}>Guanaco Business</h1>
            <h1 className={classes["infotext"]}>
            Debe contener entre 8 y 20 caracteres, 
            y debe incluir al menos un número (0-9), 
            mayúscula y caracter especial (_?!-)
                </h1>
            <div className={classes["inputemailContainer"]}>
                <p className={classes["inputemailTitle"]} > Nueva Contraseña</p>
                <input className={classes["inputformat"]} type="text" placeholder="Correo electronico" />
                <p className={classes["inputemailTitle"]} > Vuelve a escribir la contraseña</p>
                <input className={classes["inputformat"]} type="text" placeholder="Correo electronico" />
            </div>

           <div className={classes["loginContainer"]}>

           <button 
           onClick={updateHandler}
           className={classes["buttonlogin"]}>
                Actualizar Contraseña
            </button>        

            </div>
            </div>
            </form>

            <div className={classes["imgContainer"]} >
            <img className={classes["imgtemplate"]} src={imgtemplate} /></div>
             </div>
        

    )
}

    export default UpdatePasswordForm;
