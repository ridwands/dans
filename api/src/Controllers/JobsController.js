const axios = require('axios')
const _ = require('lodash')

module.exports.jobsList = async (req, res) => {
    try {
        const {data} = await axios({
            url: "http://dev3.dansmultipro.co.id/api/recruitment/positions.json",
            method: "GET",
        })

        var result = []
        if (!_.isEmpty(req.query.location) || !_.isEmpty(req.query.description || JSON.parse(req.query.full_time))) {
            for (let i = 0; i < data.length; i++) {
                let job = data[i]

                if (!_.isEmpty(req.query.description)) {
                    let desc = job.description
                    let searchDesc = desc.search(req.query.description)
                    let company=job.company
                    let searchCompany=company.search(req.query.description)
                    let title=job.title
                    let searchTitle=title.search(req.query.description)

                    if (searchDesc !== -1) {
                        result = [...result, job]
                    }else if (searchCompany!==-1){
                        result=[...result,job]
                    }else if (searchTitle!==-1){
                        result=[...result,job]
                    }
                }


                if (!_.isEmpty(req.query.location)) {
                    let loc = job.location
                    let searchLoc = loc.search(req.query.location)
                    if (searchLoc !== -1) {
                        if (result.length!==0){
                            var isPresent=[]
                            for (const l in result) {
                                var t=result[l]
                                if (t.id === job.id) {
                                    isPresent.push(true)
                                }
                            }
                            if (!isPresent.includes(true)){
                                console.log(job.id)
                                result=[...result,job]
                            }
                        }else {
                            result = [...result, job]
                        }


                    }
                }

                if (!_.isEmpty(req.query.full_time)) {
                    if (JSON.parse(req.query.full_time) === true) {
                        if (job.type === "Full Time") {
                            // for (const l in result) {
                            //     if (l.id !== job.id) {
                                    result = [...result, job]
                                // }
                            // }
                        }
                    }
                }
            }
        } else {
            result = data
        }

        var dataResult = []
        for (let i = 0; i < result.length; i++) {
            const job = result[i]
            const offset = parseInt(req.query.page) * parseInt(req.query.limit) - parseInt(req.query.limit)
            const limit = parseInt(req.query.limit) * parseInt(req.query.page)
            if (i >= offset) {
                if (i < limit) {
                    dataResult = [...dataResult, job]
                }
            }
        }

        return res.send({
            code: 200,
            message: "Success",
            data: dataResult
        })
    } catch (err) {
        throw err
    }
}

module.exports.jobsDetail = async (req, res) => {
    try {
        const {data} = await axios({
            url: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`,
            method: "GET",
        })
        return res.send({
            code: 200,
            message: "Successfully",
            data: data
        })
    } catch (err) {
        throw err
    }
}