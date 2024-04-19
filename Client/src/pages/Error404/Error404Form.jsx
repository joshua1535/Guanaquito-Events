import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.jpg';
import classes from './Error404Form.module.css';
import { useNavigate } from 'react-router-dom';


const Error404Form = () => {

    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate('/');
    };

    return (
        <div className={classes["generalContainer"]}>
            <div className={classes["infoContainer"]} >
                <div className={classes["infoContainer2"]}>
                    <div className={classes["logoContainer"]}>
                        <img className= {classes["logoImg"]} src={logo} />
                        
                        <h1 className={classes["logintitle"]}>
                            Guanaco Business
                        </h1>
                    </div>

                    
                    <div className={classes["infoContainer3"]}>
                        <h1 className={classes["infotext"]}>
                            Oh no! Error 404        
                        </h1>

                        <h1 className={classes["infotext2"]}>
                            Algo ha salido mal y por eso estas aqui.        
                        </h1>
                    

                        <div className={classes["loginContainer"]}>

                            <button
                                type='button'
                                onClick={goBackHandler}
                                className={classes["buttonlogin"]}>
                                Volver atras
                            </button>        

                    </div>

                </div>


                </div>
                
            </div>

        </div>
        
        

    )
}

    export default Error404Form;
