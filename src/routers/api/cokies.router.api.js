import { Router } from "express";

const cookiesRouter = Router();

//para setear cookies
cookiesRouter.get("/set/:mode", async (req, res, next) => {
  try {
    const { mode } = req.params;
    const maxAge = 15000 * 4;
    const signed = true;
    return res
      .cookie("mode", mode, { maxAge })
      .cookie("sessionId", "hola1234", { maxAge, signed })
      .json({
        statusCode: 200,
        message: "Cookie configurada - Modo: " + mode,
      });
  } catch (error) {
    return next(error);
  }
});

//para leer cookies
cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const mode = req.cookies.mode;
    const sessionId = req.signedCookies.sessionId;
    return res
      //.status(200)    //mientras no declare este método: la API es REST (stateless)
      .json({
        statusCode: 200,
        response: { mode, sessionId }
      });
  } catch (error) {
    return next(error);
  }
});

//para eliminar cookies
cookiesRouter.get("/clear", async (req, res, next) => {
  try {
    return res
      .clearCookie("mode")
      .clearCookie("sessionId")
      .json({
        statusCode: 200,
        response: {
          modo: req.cookies.mode,
          sessionId: req.signedCookies.sessionId,
        },
      });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;