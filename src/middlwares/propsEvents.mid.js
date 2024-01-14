function propsEvents(req, res, next) {
  // ver si estan las propiedades obligatorias sino error=> no dejo pasar
  const { name, place } = req.body;
  if (!name || !place) {
    return res.json({
      statusCode: 400,
      message: `Name & Place are required`
    })


    // const error = new Error(`Name & Place are required`);
    // error.statusCode = 404;
    // throw error;
  } else {
    return next();
  }
}

export default propsEvents;
