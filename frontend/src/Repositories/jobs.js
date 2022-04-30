import {API_ENDPOINT, API_INSTANCE} from "../Config/api";

export const JobsListRepo = async (page=1,description='',location='',full_time='')=>{
    const res=await API_INSTANCE.get(API_ENDPOINT.jobs.list,{
        params: {
            limit: 5,
            page: page,
            description: description,
            location: location,
            full_time: full_time
        }
    })
    return res.data
}

export const JobsDetailRepo = async(id)=>{
    const res=await API_INSTANCE.get(`${API_ENDPOINT.jobs.detail}/${id}`)
    return res.data
}