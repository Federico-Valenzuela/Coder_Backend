function propsProducts(req, res, next) {
    const { 
      title, photo, price, stock } = req.body;
    if (!title || !photo || !price || !stock) {
      return res.json({
        statusCode: 400,message: 'title &photo& price & stock are required'
      })
      
      
    } else {
      return next();
    }
  }
  
  export default propsProducts;