import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";
import propsOrders from "../../middlwares/propsOrders.mid.js"

const ordersRouter = Router();

ordersRouter.post("/",propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.createOrder(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.readOrders();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOrderById(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid/:quantity/:state", async (req, res, next) => {
  try {
    const { oid, quantity, state } = req.params;
    const response = await orders.upDateOder(oid,quantity,state);
    return res.json({
      statusCode: 200,
      response: "update" + response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.removeOrderById(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
