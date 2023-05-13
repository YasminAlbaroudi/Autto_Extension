import React from 'react';
import { useAuth } from '../Context/AuthContext';
import {   Card,CardContent, Fab, InputBase, Skeleton, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { getWorkflows } from '../Firebase/Firestore';
import DS_icons from '../Datasource/DS_icons';
import {motion} from "framer-motion";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DS_functions from '../Datasource/DS_functions';
import NavBar from '../NavBar/NavBar';
const MainDiv = styled.div`
    background-color: #ededed;
    width: 100%;
    position: fixed;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
`;
const MainGrid=styled.div`
    transition: all 0.3s ease;
    display: grid;
    width: 80%;
    margin-left: 10%;
    grid-auto-rows: 1fr;
    padding-top: 5%;
    padding-bottom: 5%;
    grid-gap: 2rem;
      `;
export default function Dashboard() {
    const [loading,SetLoading]=React.useState(true);
    const [workflows,setWorkflow]=React.useState([]);
    const {currentUser}=useAuth();
    console.log("uid",currentUser.uid);
    React.useEffect(()=>{
        getWorkflows(currentUser.uid).then((data)=>{
            setWorkflow(data);
            SetLoading(false);
        })
    },[]);
    const run = React.useCallback(
      (index) => {
        const workflow = workflows[index];
        window.chrome.extension
          .getBackgroundPage()
          .backgroundRun({ workflow: workflow, DS_functions: DS_functions });
      },
      [workflows]
    );
    return(
      <>
        <NavBar/>

        <MainDiv>
            <Typography variant="h4" component="div"  align="center" fontFamily= "'Major Mono Display', monospace" fontWeight="bold"  paddingTop="6vh">{`Hello ${currentUser.displayName} !`} </Typography>
            <MainGrid >
            {
                loading?
                [1,2,3,4,5,6,8,9,10].map(key=>{
                    return (
                        <SkeletonCard key={key}/>
                    )
                })
                :
                workflows.map((workflow,index)=>{
                    return(
                        <WorkflowCard workflow={workflow} key={workflow.id} run={run} index={index}/>
                    );

                })
                
            }
            </MainGrid>
            {!loading && workflows.length===0 && 
            <div style={{display:"flex" ,width:"100%" ,justifyContent:"center"}}>
            <Typography variant="h5" component="div"  align="center"  fontWeight="bold"  paddingTop="5%">No workflows found</Typography>
            </div>
            }
        </MainDiv>
        </>
    )
}

const WorkflowCard=({workflow,index,run})=>{
  const innerDivStyle={
    position:"absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backdropFilter: "inverse",
    borderRadius: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight:"1rem",
    alignItems: "center",
    transition: "opacity 0.3s ease",
    zIndex:"200"
  };
  return(
    <motion.div  initial={{scale:1,"boxShadow":"grey 0px 11px 20px 4px " , "borderRadius":"1rem",backgroundColor:"#464646",color:"#ededed",transition:"opacity 0.3s ease"}} whileHover={{scale:1.1, "boxShadow":"rgb(104, 24, 151) 0px 5px 10px 1px " ,color:"#464646",backgroundColor:"#ededed"}} 
     transition={{
          ease: "linear",
          duration: 0.2,
          x: { duration: 0.1 }
        }}
      style={{cursor:"pointer",}}
      onClick={()=>{
        run(index);
      }}
      >
        <div style={{position:"relative" ,width:"100%",height:"100%"}}>
        <CardContent style={{position:"relative"}}>
          <Typography variant="p"  fontSize="large" >{DS_icons[workflow.icon]}</Typography>
          <Typography variant="h5"  fontWeight="600" style={{paddingTop:"0.5rem",display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis',width: "calc(100% - 5rem)" }} >{workflow.name}</Typography>
        </CardContent>
        <motion.div
        id={`id_${workflow.id}`}
            style={innerDivStyle}
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 1 /* Show on hover */
            }}
          >
            <PlayArrowIcon style={{ color: "#681897", fontSize: "4rem",marginRight:"2rem" }} />
          </motion.div>
          </div>
      </motion.div>
    )

}

const SkeletonCard=({key})=>{
  return(
    <Card key={key} style={{ backgroundColor: "#464646", color: "#ededed",height:"100%",paddingLeft:"1rem",marginBottom:"1rem",borderRadius:"1rem" }}>
    <Skeleton key={`${key}_1`} animation="pulse" variant="circular" width={25} height={25}   style={{backgroundColor:"rgb(166 166 166)",marginTop:"1rem" }} />
    <Skeleton key={`${key}_2`} animation="pulse" variant='text' sx={{fontSize:"1.5rem",marginTop:"0.8rem",fontWeight:"600"}} width="70%" style={{backgroundColor:"rgb(166 166 166)", }} />
    <Skeleton key={`${key}_3`} animation="pulse" variant='text' sx={{fontSize:"1.5rem",fontWeight:"600"}} width="30%" style={{backgroundColor:"rgb(166 166 166)", }} />
    </Card>
  )
}