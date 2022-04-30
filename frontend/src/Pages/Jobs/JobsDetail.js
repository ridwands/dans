import React, {useEffect, useState} from 'react';
import {Card, CircularProgress, Container, Divider, Stack, Typography} from "@mui/material";
import {JobsDetailRepo} from "../../Repositories/jobs";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

const JobsDetail = () => {
    let params=useParams()
    const [jobsDetailData, setJobsDetailData] = useState({});
    const[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const jobsDetail = ()=>{
        setIsLoading(true)
        JobsDetailRepo(params.id).then((res)=>{
            if (res.code===200){
                setTimeout(()=>{
                    setJobsDetailData(res.data)
                },500)
            }else {
                alert(JSON.stringify(res))
            }
        }).catch((err)=>{
            alert(JSON.stringify(err))
        }).finally(()=>{
            setTimeout(()=>{
                setIsLoading(false)
            },500)
        })
    }
    useEffect(()=>{
        jobsDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleBack=()=>{
        navigate("/jobs")
    }
    return (
        <div>
            <Container sx={{
                mt: 2,
            }}>
                <ArrowBack sx={{
                    cursor:'pointer'
                }} onClick={handleBack}/>
                {isLoading &&   <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                ><CircularProgress/></Stack>}
               <Card sx={{
                   maxHeight:800,
                   overflowY:'auto'
               }}>
                   <Typography>{jobsDetailData?.type}/{jobsDetailData?.location}</Typography>
                   <Typography variant={"h6"}>{jobsDetailData?.title}</Typography>
                   <Divider/>

                   <Typography dangerouslySetInnerHTML={ { __html: jobsDetailData?.description } }></Typography>
               </Card>
            </Container>
        </div>
    );
};

export default JobsDetail;
