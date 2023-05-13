import { useAuth } from "./Context/AuthContext"
import SignIn from "./SignIn/SignIn";
import DashBoard from "./Workflow/NewDashboard";

export default function DefaultRoute(props) {
    const {currentUser}=useAuth();
    return(
        <>
        {currentUser ? <DashBoard/> : <SignIn/>}
        </>
    )}