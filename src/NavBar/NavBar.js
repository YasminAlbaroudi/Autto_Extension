
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import LogoLight from "../images/logo_light.png"
import React from 'react'
import { useAuth } from "../Context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
export default function NavBar(props) {
    const {currentUser,logOut}=useAuth();
    return(
        <>
            <AppBar key={1}  style={{position:"fixed", backgroundColor:"#681897",opacity:"0.7",color:"#ededed" , height:"6vh",zIndex:"200"}}>
                <div style={{width:"97%",display:"flex",alignItems:"center",margin:"auto",marginRight:"1%",gap:"1rem"}}>
                    <div style={{marginRight:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.2rem"}}>
                        <Typography  fontSize="1rem" fontFamily= "'Major Mono Display', monospace" variant='h3' color={props.color} fontWeight="bold">Autto</Typography>
                        <img src={LogoLight} alt="logo" style={{width:"4vh"}}/>
                        
                    </div>
                        
                    <div style={{borderLeft:"2px solid white" }}>
                    <Tooltip title="Sign Out">
                        <IconButton  onClick={()=>{
                            logOut();
                        }} ><LogoutIcon color="primary"/></IconButton>
                    </Tooltip>
                    </div>
                    </div>
            </AppBar>
        </>
    );
}   