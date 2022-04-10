import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { styled, Theme, useTheme } from "@mui/material/styles";
import {Box, Toolbar, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Navbar from "../../src/components/student/Navbar";
import CourseLesson from '../../src/components/student/course/lesson'
import {
  Person,
  LocalLibrary,
  Menu,
  ChevronLeft,
  AccountCircleOutlined,
  MonetizationOnOutlined,
  AccessTimeOutlined,
  CollectionsOutlined,
  EqualizerOutlined
} from "@mui/icons-material";;
import Head from "next/head";
import React from 'react'
import ReactPlayer from 'react-player'
import { TRUE } from "sass";
import LessonTrains from "../components/student/lesson";
import LessonExplanation from "../components/student/lesson/lesson";

function SidebarIcon(props: any) {
  switch (props.index) {
    case 0:
      return <LocalLibrary />;
    case 1:
      return < Person/>;

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
  let overView = true
  let lessonView = false
  let lessonDashboardId = 1
  const setViews = (id: string):void => {
  if(id == 'OverView') {
    lessonView = false
    overView = true
    lessonDashboardId = 1
  } else {
    overView = false 
    lessonView = true
    lessonDashboardId = 2
  }
}
function ToggleTitle({props}) {
  if(props.isActive) {
    return (
      <li className={`flex-1 font-bold active text-center py-2`} onClick={() => setViews(props.title)}>{props.title}</li>
    )
  } else {
    return (
      <li className={`flex-1 font-bold text-center py-2`} onClick={() => setViews(props.title)}>{props.title}</li>
    )
  }
}

function LessonDashboard({props}) {
  switch(props.id) {
    case 1: 
      return <LessonTrains data={props.data} currentUserEmail={props.currentUserEmail}/>
      break;
    case 2: 
    return <LessonExplanation lesson={props.lesson} lessonId={props.lessonId} setLessonId={props.setLessonId}/>
    break
    default:
      null
  }
}
  
export default function StudentLesson() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sidebar, setSidebar] = useState(0);
  const [active, setActive] = useState(false)

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
    const [user, setUser] = useState([])
    const [lesson, setLesson] = useState([])
    const [lessonId, setLessonId] = useState<number>(0)
    const email: string[] | string = router.query.slug || ''
    const loadLesson = async() => {

      const data = await axios.get(`/api/lesson/${router.query.slug[1]}`)
      setLesson(data.data)
    }
    useEffect(() => {
      loadLesson()
    },)
    console.log(lessonId)
    return (
      <Box sx={{ display: "flex" }}>
      <Head>
        <title>Хичээл</title>
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
          {["Courses", "Profile"].map(
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

        {/* <StudentDashboards sidebar={sidebar} courses={courses} myCourses={myCourses}/> */}
        {lesson[2] && (
          <>
        <div className="flex">
          <div className="video_container">
          <div className="video w-full">
        <CourseLesson props={lesson[2]} />
        </div>
        <div>
          <ul className="flex">
            <ToggleTitle props={{title: 'OverView', isActive: overView}} />
            <ToggleTitle props={{title: 'Lesson', isActive: lessonView}}/>
          </ul>
          <div>
            <LessonDashboard props={{id: lessonDashboardId, data: lesson[2], currentUserEmail: email[0], lesson: lesson, lessonId: lessonId, setLessonId: setLessonId}}/>
          </div>
        </div>
          </div>
        <div className="flex-1 relative ml-12">
        <ul className="sticky top-20 mt-8 shadow px-6 py-8 rounded-md ">
          <li className="flex justify-between mb-6"><span className="text_color_1 font-bold">< MonetizationOnOutlined sx={{fill: '#6ec1e4', marginRight: '0.5rem' }}/>Course Price</span><span className="font-bold text_color_2">${lesson[2].price}</span></li>
          <li className="flex justify-between mb-6"><span className="font-bold">< AccountCircleOutlined sx={{fill: '#6ec1e4', marginRight: '0.5rem' }}/>Instructor</span><span className="font-bold ">{lesson[2].teacher_name}</span></li>
          <li className="flex justify-between mb-6"><span className="font-bold">< AccessTimeOutlined sx={{fill: '#6ec1e4', marginRight: '0.5rem' }}/>Duration</span><span className="font-bold ">1 year</span></li>
          <li className="flex justify-between mb-6"><span className="font-bold">< CollectionsOutlined sx={{fill: '#6ec1e4', marginRight: '0.5rem' }}/>Lectures</span><span className="font-bold ">{lesson.length}</span></li>
          <li className="flex justify-between mb-6"><span className="font-bold">< EqualizerOutlined sx={{fill: '#6ec1e4', marginRight: '0.5rem' }}/>Skill level</span><span className="font-bold ">All level</span></li>
        </ul>
        </div>
        </div>
        </>
        )}
        {/* {lesson && lesson.map((l, index) => {
          return (
            <>
            <ReactPlayer
            url={l.video}
            playing={true}
            volume={1}
            width="100%"
            height="100%"
            light={l.thumbnail}
            controls
            />
            </>
          )
        })} */}
      </Box>
    </Box>
    )
}