import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import * as React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import {Box, Toolbar, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Navbar from "../../src/components/student/Navbar";
import {
  Dashboard,
  HistoryEdu,
  Person,
  EventAvailable,
  Menu,
  ChevronLeft,
  AddTask
} from "@mui/icons-material";
// import StudentDashboard from "../../src/components/student/dashboard";
import TeacherDashboard from '../components/teacher/lesson'
import TeacherGroup from '../components/teacher/group'
import AdminAddStudent from '../components/admin/student/group'
import TeacherGroups from '../components/teacher/group/group'
import Head from "next/head";
function SidebarIcon(props: any) {
  switch (props.index) {
    case 0:
      return <AddTask />;
    case 1:
      return < Person/>;
    case 2: 
      return <HistoryEdu />
   case 3:
     return <AddTask />
    default:
      return <></>;
  }
}
function TeacherDashboards({sidebar, setSidebar, setGroupId, groupId, teacherId}: { sidebar: number, setSidebar: any, setGroupId: any, groupId: number, teacherId: number }) {
  switch (sidebar) {
    case 0:
      return <TeacherDashboard setSidebar={setSidebar} setGroupId={setGroupId}/>;
    case 1:
      return < TeacherGroup groupId={groupId}/>;
    case 2:
      return < TeacherGroups teacherId={teacherId}/>
    case 3: 
      return <AdminAddStudent />
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


  
export default function Teacher() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sidebar, setSidebar] = useState<number>(0);
  const [groupId, setGroupId] = useState<number>(0)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSidebar = (e: { target: { id: React.SetStateAction<number>; }; }) => {
    setSidebar(Number(e.target.id));
  };
    const router:NextRouter = useRouter()
    const {slug} = router.query
    const [user, setUser] = useState([])
    const loadUser = async() => {
        try {
            const data = await axios.get(`/api/user/${slug}`, {params: {login: 'teacher'}})
            setUser(data.data)
            data.data[0] === undefined || data.data.isLogin ? router.push('/teacher/Login') : null
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
         loadUser() 
    },[]);
    
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
        <title>Багш</title>
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
          {["Хичээл оруулах", "Хичээл нэмэх", "Грүпп нэмэх", 'Сурагч нэмэх'].map(
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
                  id={index}

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

        {user[0] && <TeacherDashboards sidebar={sidebar} setSidebar={setSidebar} setGroupId={setGroupId} groupId={groupId} teacherId={user[0].teacher_id}/>}
      </Box>
    </Box>
    )
}