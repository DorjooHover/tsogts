import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {Box, Typography} from "@mui/material";
import { Search, Settings } from "@mui/icons-material";
import Image from 'next/image'
function Title(props: { title: string; }) {
  switch (Number(props.title)) {
    case 0:
      return <>Course</>
    case 1:
      return <>Profile</>;
    default:
      return <></>;
  }
}
export default function Navbar({ dashboard }) {
  return (
    <Box sx={{display: 'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
      <Typography component='h2' sx={{color:'black', fontWeight:'700', fontSize:'1.5rem', marginLeft:'2rem'}}>
        <Title title={dashboard} />
      </Typography>
      {/* <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, backgroundColor: 'white', borderBottom: '1px solid #eee' }}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search here..."
          inputProps={{ "aria-label": "search" }}
        />
      </Paper> */}
      <Box sx={{height: '3rem'}}>
        {/* <IconButton sx={{padding:'0', marginRight:'0.5rem'}}>
          <Settings /> 
        </IconButton> */}
        <IconButton sx={{height:'100%', width:'3rem'}}>
            <Image src="/img/students/default.png"
            alt="student"
            layout='fill'
            />
        </IconButton>
      </Box>
    </Box>
  );
}
