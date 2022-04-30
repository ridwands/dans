import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CircularProgress,
    Container,
    Divider, Grid, InputLabel,
    Stack,
    TextField,
    Typography,
    useTheme,
    Checkbox
} from "@mui/material";
import {JobsListRepo} from "../../Repositories/jobs";
import {useNavigate} from "react-router-dom";

const JobsList = () => {
    const [jobsData, setJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [filterDesc, setFilterDesc] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterFullTime, setFilterFullTime] = useState(false);
    const navigate = useNavigate()
    const [isMore, setIsMore] = useState(false)

    const handleMoreJobs = () => {
        setPage(prevState => prevState + 1)
        setIsMore(true)
    }

    useEffect(() => {
        getJobs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filterDesc, filterLocation, filterFullTime])
    const getJobs = () => {
        setIsLoading(true)
        JobsListRepo(page, filterDesc, filterLocation, filterFullTime).then((res) => {
            if (res.code === 200) {
                setTimeout(() => {

                    setJobsData(res.data)
                    if (isMore) {
                        setJobsData(prevState => [...prevState, ...res.data])
                    }

                }, 500)
            } else {
                alert(JSON.stringify(res))
            }
        }).catch((err) => {
            alert(JSON.stringify(err))
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false)
                setIsMore(false)
            }, 500)
        })
    }

    const handleDetailJobs = (id) => {
        return navigate(`/jobs/detail/${id}`)
    }

    const theme = useTheme()
    return (
        <div>
            <Container sx={{
                mt: 2,
            }}>
                <Typography variant={"h3"}>Jobs</Typography>
                <div style={{
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <InputLabel>Job Description</InputLabel>
                            <TextField onChange={(e) => setFilterDesc(e.target.value)}
                                       placeholder={"Description,Title,Company"}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InputLabel>Location</InputLabel>
                            <TextField onChange={(e) => setFilterLocation(e.target.value)} placeholder={"Location"}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InputLabel>Full Time</InputLabel>
                            <Checkbox onChange={() => setFilterFullTime((prevState => !prevState))}
                                      checked={filterFullTime}/>
                        </Grid>
                    </Grid>
                </div>
                <Card sx={{
                    maxHeight: 600,
                    overflowY: 'auto'
                }}>
                    {jobsData.map((row, index) => {
                        return (
                            <div style={{
                                cursor: 'pointer'
                            }} onClick={() => handleDetailJobs(row.id)} key={`${row.id}${index}`}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Typography sx={{
                                        mt: 2
                                    }} color={theme.palette.primary.main}>{row?.title}</Typography>
                                    <Typography>{row?.location}</Typography>
                                </Stack>
                                <Typography sx={{
                                    mt: 1
                                }}>{row.company} - <span>{row.type}</span> </Typography>
                                <Divider/>
                            </div>
                        )
                    })}
                </Card>
                {isLoading && <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                ><CircularProgress/></Stack>}

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Button
                        onClick={handleMoreJobs}
                        sx={{
                            mt: 1
                        }} variant={"contained"}>More Jobs</Button>
                </Stack>
            </Container>
        </div>
    );
};

export default JobsList;
