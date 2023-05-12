import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const SignOut = ({ onLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onLoggedIn(false);
        localStorage.setItem('token', '');
        localStorage.setItem('email', '');
        navigate('/sign-in', { replace: true });

    }, [])
    return (
        <div>выходим...</div>
    )
}
export default SignOut