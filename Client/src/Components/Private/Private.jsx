import { useUserContext } from '../../Context/userContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({role, children }) => {
    const { token, user } = useUserContext();
    
    if(!token) return <Navigate replace to="/"/>;
    if(!user || !user.permits.some(permit => permit.name === role)) return <Navigate replace to="*"/>;

    return children;
}

export default PrivateRoute;