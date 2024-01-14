function propsUsers(req, res, next) {
    const { name, email, photo } = req.body;
    if (!name || !email || !photo) {
      return res.json({
        statusCode: 400.,
        message: 'Name & Photo & Mail is required'
      })


    } else {
      return next();
    }
  }
  
  export default propsUsers;