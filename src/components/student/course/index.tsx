import {
    ArrowForwardIos,
    Star,
    FiberManualRecord,
    LocalLibrary,
    ArrowBackIosNew
  } from "@mui/icons-material";
  import * as React from "react";
  import Pagination from "@mui/material/Pagination";
  import {Box, Typography, Grid} from '@mui/material'
  import Stack from "@mui/material/Stack";
  import { useState, useEffect } from "react";
  import Image from 'next/image'
  import {useRouter} from 'next/router'
  export default function StudentCourse({data}) {
    const [perCourses, setPerCourses] = useState(3)
    const [startCourses, setStartCourses] = useState(0)
    const [courses, setCourses] = useState([])
    const [myCourses, setMyCourses] = useState([])
    const [viewCourses, setViewCourses] = useState(false)
    const router = useRouter()
    const changeCourses = (event, value) => {
      const datas = []
      for ( let i = value; i< (value + perCourses); i++) {
        if(data.courses[i] !== undefined) {
          datas.push(data.courses[i])
        } 
      }
      setCourses(datas)
    }
    const loadCourses = () => {
      const datas = []
      const myDatas = []
      for ( let i = startCourses; i< (startCourses + perCourses); i++) {
        if(data.courses[i] !== undefined) {
          datas.push(data.courses[i])
        } else {
          null
        }
        if(data.myCourses[i] !== undefined) {
          myDatas.push(data.myCourses[i])
        } else {
          null
        }
      }
      setCourses(datas)
      setMyCourses(myDatas)
    }
    const changeView = () => {
      setViewCourses(true)
    }
    const changeViewPag = () => {
      setViewCourses(false)
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        loadCourses()
      }, 3000);
      return () => clearTimeout(timer);
    }, [courses, myCourses]);

    return (
      <>

        <Grid sx={{marginTop:'1.5rem'}}>
          {/* <div className="category mb-10 mt-4">
            <div className="flex justify-between">
              <h2 className="font-semibold text-xl">Categories</h2>
              <div className="flex">
                <h6 className="mr-3">View all</h6>
                <ArrowForwardIos className="course_icon w-3" />
              </div>
            </div>
            <div className="flex mt-8 items-center px-6">
              <div className="mr-4 h-10">
                <img
                  src="/img/categories/china.png"
                  alt="flag"
                  className="h-full"
                />
              </div>
              <div className="mr-4">
                <h3 className="text-base font-medium">China</h3>
                <p className="text-xs text-gray-600">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <ArrowForwardIos className="course_icon w-3" />
            </div>
          </div> */}
          <Box className="courses mb-8">
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <Typography component='h3' sx={{textTransform:'capitalize', fontSize:'1.2rem', fontWeight:'600'}}>Your Courses</Typography>
              {/* <Box sx={{display:'flex', alignItems:'center'}}>
                <Typography component='h6' sx={{textTransform:'capitalize', fontSize:'0.8rem', marginRight:'0.5rem'}}>Дэлгэрэнгүй</Typography>
                <ArrowForwardIos sx={{width:'0.8rem'}}/>
              </Box> */}
            </Box>
            <Box sx={{display:'grid', gridTemplateColumns:`repeat(${perCourses}, minmax(0, 1fr))`, padding:"0 1rem", gridGap:'2rem'}}>
              {myCourses[0] !== undefined && myCourses.map((course) => {
                return (
                  <>
                  <Grid sx={{marginBottom:'1rem', cursor: 'pointer'}} key={course.lesson_bundle_id} onClick={() => router.push(`/studentLesson/${router.query.slug[0]}/${course.group_id}`)}>
                <Box sx={{borderRadius:'0.5rem', position:'relative', height: '8rem', overflow:'hidden'}}>
                  <Image src="/img/students/student_1.jpg"
                    alt=""
                    layout='fill'
                  />
                </Box>
                <Grid sx={{margin:'0.5rem 0'}}>
                    <Typography component='h3' sx={{fontWeight:'600', textTransform:'capitalize', fontSize:'1.2rem'}}>{course.lesson_name}</Typography>

                  <Box sx={{fontSize:'0.7rem', display:'flex', alignItems:'center'}}>
                    <Typography sx={{fontSize:'0.7rem'}}>{course.teacher_name} &nbsp;</Typography>
                      {/* <FiberManualRecord sx={{fontSize:'0.5rem'}}/> */}
                    {/* <span>&nbsp; 5.0 &nbsp;</span>
                      <Star sx={{fontSize:'0.5rem'}} /> */}
                  </Box>
                </Grid>
                <Box sx={{display: 'flex', justifyContent:'space-between', fontSize:'0.9rem', alignItems:'center'}}>
                  <Box sx={{display: 'flex', alignItems:'center'}} className="text-gray-600 flex items-center">
                      <LocalLibrary sx={{fontSize:'0.9rem'}}/>
                    <p> &nbsp;110+ Content</p>
                  </Box>
                  <span className="text-teal-500">View Details</span>
                </Box>
              </Grid>
              </>
                )
              })}
              {!myCourses[0]!== undefined && !myCourses && <>Хичээл олдсонгүй.</>}
            </Box>
            <Stack spacing={2} >
              <Pagination
                count={Math.ceil(data.myCourses.length / 3)}
                shape="rounded"
                sx={{display:'flex', justifyContent:'flex-end'}}
              />
              {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
            </Stack>
          </Box>
          {!viewCourses && (
            <>
            <Box className="courses">
          <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <Typography component='h3' sx={{textTransform:'capitalize', fontSize:'1.2rem', fontWeight:'600'}}>All Courses</Typography>
              <Box sx={{display:'flex', alignItems:'center'}}>
                <Typography component='h6' sx={{textTransform:'capitalize', fontSize:'0.8rem', marginRight:'0.5rem', cursor: 'pointer'}} onClick={() => changeView()}>Дэлгэрэнгүй</Typography>
                <ArrowForwardIos sx={{width:'0.8rem'}}/>
              </Box>
            </Box>
            <Box sx={{display:'grid', gridTemplateColumns:`repeat(${perCourses}, 1fr)`, padding:"0 1rem", gridGap:'2rem'}}>
           {courses[0] != undefined && courses.map((course) => {
              return (
                <>
                <Grid sx={{marginBottom:'1rem'}} key={course.lesson_bundle_id} >
              <Box sx={{borderRadius:'0.5rem', position:'relative', height: '8rem', overflow:'hidden'}}>
                  <Image src="/img/students/student_1.jpg"
                    alt=""
                    layout='fill'
                  />
                  </Box>
                <Grid sx={{margin:'0.5rem 0'}}>
                  <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <Typography component='h3' sx={{fontWeight:'600', textTransform:'capitalize', fontSize:'1.2rem'}}>{course.lesson_name}</Typography>

                    <div className="flex font-semibold text-xl">
                      <span className="text-teal-500">$&nbsp;</span>
                      <span>{course.price}</span>
                    </div>
                  </Box>
                  <Box sx={{fontSize:'0.7rem', display:'flex', alignItems:'center'}}>
                    <Typography sx={{fontSize:'0.7rem'}}>{course.teacher_name} &nbsp;</Typography>
                      <FiberManualRecord sx={{fontSize:'0.5rem'}}/>
                    <span>&nbsp; 5.0 &nbsp;</span>
                      <Star sx={{fontSize:'0.5rem'}} />
                  </Box>
                </Grid>
                <Box sx={{display: 'flex', justifyContent:'space-between', fontSize:'0.9rem', alignItems:'center'}}>
                  <Box sx={{display: 'flex', alignItems:'center'}} className="text-gray-600 flex items-center">
                      <LocalLibrary sx={{fontSize:'0.9rem'}}/>
                    <p> &nbsp;110+ Content</p>
                  </Box>
                  <span className="text-teal-500">View Details</span>
                </Box>
              </Grid>
              </>
              )
            })}  

            </Box>
            <Stack spacing={2} >
              <Pagination
                count={Math.ceil(data.courses.length / perCourses)}
                shape="rounded"
                sx={{display:'flex', justifyContent:'flex-end'}}
                onChange={(event, value) => changeCourses(event, value)}
              />
              {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
            </Stack>
          </Box> 
          </>
          )}
          {viewCourses && (
            <>
            <Box className="courses">
          <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <Typography component='h3' sx={{textTransform:'capitalize', fontSize:'1.2rem', fontWeight:'600'}}>All Courses</Typography>
              <Box sx={{display:'flex', alignItems:'center'}}>
                <ArrowBackIosNew sx={{width:'0.8rem'}}/>
                <Typography component='h6' sx={{textTransform:'capitalize', fontSize:'0.8rem', marginLeft:'0.5rem'}} onClick={() => changeViewPag()}>Хураангуй</Typography>
              </Box>
            </Box>
            <Box sx={{display:'grid', gridTemplateColumns:`repeat(${perCourses}, 1fr)`, padding:"0 1rem", gridGap:'2rem'}}>
           {data.courses[0] != undefined && data.courses.map((d) => {
              return (
                <>
                <Grid sx={{marginBottom:'1rem'}} key={d.lesson_bundle_id} >
              <Box sx={{borderRadius:'0.5rem', position:'relative', height: '8rem', overflow:'hidden'}}>
                  <Image src="/img/students/student_1.jpg"
                    alt=""
                    layout='fill'
                  />
                  </Box>
                <Grid sx={{margin:'0.5rem 0'}}>
                  <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <Typography component='h3' sx={{fontWeight:'600', textTransform:'capitalize', fontSize:'1.2rem'}}>{d.lesson_name}</Typography>

                    <div className="flex font-semibold text-xl">
                      <span className="text-teal-500">$&nbsp;</span>
                      <span>{d.price}</span>
                    </div>
                  </Box>
                  <Box sx={{fontSize:'0.7rem', display:'flex', alignItems:'center'}}>
                    <Typography sx={{fontSize:'0.7rem'}}>{d.teacher_name} &nbsp;</Typography>
                      <FiberManualRecord sx={{fontSize:'0.5rem'}}/>
                    <span>&nbsp; 5.0 &nbsp;</span>
                      <Star sx={{fontSize:'0.5rem'}} />
                  </Box>
                </Grid>
                <Box sx={{display: 'flex', justifyContent:'space-between', fontSize:'0.9rem', alignItems:'center'}}>
                  <Box sx={{display: 'flex', alignItems:'center'}} className="text-gray-600 flex items-center">
                      <LocalLibrary sx={{fontSize:'0.9rem'}}/>
                    <p> &nbsp;110+ Content</p>
                  </Box>
                  <span className="text-teal-500">View Details</span>
                </Box>
              </Grid>
              </>
              )
            })}  

            </Box>
          </Box> 
          </>
          )}
        </Grid>
      </>
    );

  }
  