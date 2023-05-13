import React from "react";
import { getWorkflows } from "../Firebase/Firestore";
import { Typography, Paper, Box, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "@emotion/styled";

import DS_functions from "../Datasource/DS_functions";
import { useAuth } from "../Context/AuthContext";
const MainDiv = styled.div`
    background-color: #ededed;
    width: 100%;
    position: fixed;
    height: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    overflow-y: scroll;
`;
const PlayButtonDiv = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2e7d32;
  border-radius: 50%;
`;

export default function DashBoard() {
  const [workflows, setWorkflows] = React.useState([]);
  const {currentUser}=useAuth();

  React.useEffect(() => {
    const APIcall = async () => {
      setWorkflows(await getWorkflows(currentUser.uid));
    };

    APIcall();
  }, []);

  const run = React.useCallback(
    (index) => {
      const workflow = workflows[index];
      window.chrome.extension
        .getBackgroundPage()
        .backgroundRun({ workflow: workflow, DS_functions: DS_functions });
    },
    [workflows]
  );

  return (
    <MainDiv>
      {workflows.map((workflow, index) => {
        console.log(JSON.parse(workflow.nodes));
        console.log(JSON.parse(workflow.edges));
        return (
          <Workflow
            elevation={4}
            style={{ backgroundColor: "#ededed" }}
            key={workflow.id}
            index={index}
            run={run}
            {...workflow}
            name={workflow.name}
          ></Workflow>
        );
      })}
    </MainDiv>
  );
}

function Workflow(props) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "#ededed",
        height: "fit-content",
        width: "80%",
      }}
      key={props.id}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
        }}
      >
        <Typography component="div" variant="h5">
          {props.name}
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          height: "fit-content",
        }}
      >
        <IconButton aria-label="settings">
          <MoreHorizIcon />
        </IconButton>
        <PlayButtonDiv>
          <IconButton
            aria-label="play/pause"
            onClick={() => {
              props.run(props.index);
            }}
          >
            <PlayArrowIcon sx={{ height: 38, width: 38, color: "white" }} />
          </IconButton>
        </PlayButtonDiv>
      </Box>
    </Paper>
  );
}
