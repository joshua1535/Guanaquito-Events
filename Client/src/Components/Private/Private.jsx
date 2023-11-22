import { useUserContext } from '../../Context/userContext';
import { Navigate } from 'react-router-dom';
import { userService } from '../../Services/userService';
import { useEffect, useState } from 'react';

const PrivateRoute = ({neededPermits, children }) => {
    const [hasPermission, setHasPermission] = useState(true);
    const { token } = useUserContext();

    
    useEffect(() => {
        
        const verifyPermits = async () => {
            const { permits } = await userService.verifyToken(token);
            if(permits) {
                let permitList = permits.map(permit => permit.name);
                if(!neededPermits.some(permit => permitList.includes(permit))) {
                    console.log("No tienes permisos para acceder a esta página");
                    setHasPermission(false);
                }
            }
        }

        verifyPermits();
    }, [neededPermits]);

    return hasPermission ? children : <Navigate to="*" />;
}

export default PrivateRoute;