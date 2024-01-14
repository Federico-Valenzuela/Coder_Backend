function propsOrders(req, res, next) {
  // ver si estan las propiedades obligatorias sino error=> no dejo pasar
  const { uid, quantity, pid, state } = req.body;
  if (!uid || !quantity || !pid || !state) {
    return res.json({
      statusCode: 400,
      message: `iud & quantity & pid & stateare required`
    })


    // const error = new Error(`Name & Place are required`);
    // error.statusCode = 404;
    // throw error;
  } else {
    return next();
  }
}

export default propsOrders;