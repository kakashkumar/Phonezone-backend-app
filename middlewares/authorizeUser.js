const authorizeUser = (permittedRoles) => {
    return (req, res, next) => {
        console.log(req.user, 'req');
        if(permittedRoles.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({ error: 'you dont have permission to access this route'})
        }
    }
}

module.exports = authorizeUser