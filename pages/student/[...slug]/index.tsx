import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import * as React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import {Box, Toolbar, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Navbar from "../../../src/components/student/Navbar";
import {
  LocalLibrary,
  Person,
  Menu,
  ChevronLeft
} from "@mui/icons-material";
// import StudentDashboard from "../../src/components/student/dashboard";
import StudentCourse from "../../../src/components/student/course";
// import StudentSchedule from "../../src/components/student/schedule";
import StudentProfile from "../../../src/components/student/profile";
import Head from "next/head";
function SidebarIcon(props: any) {
  switch (props.index) {
    case 0:
      return <LocalLibrary />;
    // case 1:
    //   return < Person/>;

    default:
      return <></>;
  }
}
function StudentDashboards(props: { sidebar: string; courses: any}) {
  switch (parseInt(props.sidebar)) {
    case 0:
      return <StudentCourse data={{courses:props.courses, myCourses: props.myCourses}}/>;
    // case 1:
    //   return < StudentProfile/>;
    default:
      return <></>;
  }
}
const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


  
export default function Student() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sidebar, setSidebar] = useState(0);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSidebar = (e: { target: { id: React.SetStateAction<number>; }; }) => {
    setSidebar(e.target.id);
  };
    const router:NextRouter = useRouter()
    const {slug} = router.query
    const [user, setUser] = useState([])
    const [courses, setCourses] = useState([])
    const [myCourses, setMyCourses] = useState([])
    const loadUser = async() => {
        try {
            const data = await axios.get(`/api/user/${slug}`, {params: {login: 'students'}})
            setUser(data.data)
            const courses = await axios.get(`/api/student/`)
            setCourses(courses.data)
            const myCourses = await axios.get(`/api/student/${data.data[0].student_id}`) 
            setMyCourses(myCourses.data)
            setTimeout(() => {
                data.data[0] === undefined || data.data.isLogin ? router.push('/Login') : null
            }, 5000)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
         loadUser() 
    },[myCourses, courses]);
    
    const handleLogout = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        router.push('/')
        setUser([])
        try {
            await axios.patch(`/api/user/${slug}`, {params: {login: 'students'}})
        }catch(error) {
            console.log(error)
        }
    }
    return (
      <Box sx={{ display: "flex" }}>
      <Head>
        <title>Сурагч</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo/lil_logo.png" />
      </Head>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="bg-white shadow-none py-2"
      >
        <Toolbar>
          <IconButton
            className="text-black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu/>
          </IconButton>
          <Navbar dashboard={sidebar} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <IconButton>
                <ChevronLeft />
              </IconButton>
            ) : (
              <div className="flex">
                <img src="/img/logo/logo_png.png" alt="logo" className="h-10" />
                <IconButton>
                  <ChevronLeft />
                </IconButton>
              </div>
            )}
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {["Хичээл", ].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                className="relative sidebar_current my-2 "
              >
                <ListItemIcon>
                  <SidebarIcon index={index} />
                </ListItemIcon>
                <ListItemText primary={text} />
                <span
                  className="absolute z-20 inset-0 "
                  onClick={handleSidebar}
                  id={Number(index)}

                ></span>
              </ListItem>
            )
          )}
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 3 }}>
        <DrawerHeader />

        <StudentDashboards sidebar={sidebar} courses={courses} myCourses={myCourses}/>
      </Box>
    </Box>
    )
}