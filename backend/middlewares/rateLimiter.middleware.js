import {rateLimit} from "express-rate-limit"

export const generalRateLimiter= rateLimit({
    windowMs:15*60*1000, //15 minutes
    limit:100,//
    message:{message:"too many request ,Pleae try again after 15 minutes"}
})

export const authRateLimiter= rateLimit({
    windowMs:15*60*1000,
    limit:10,
    message:{message:"too many attempts,Please try again after 15 minutes"}
})

