
export const checkRole =  (role) => { //outer function for role
    return (req,res,next)=>{//inner function for role from user
        if(req.user.role!==role){
            return res.status(403).json({message:"forbidden"})
        }
        // role is correct then go to next middleware
        next()
    }
}