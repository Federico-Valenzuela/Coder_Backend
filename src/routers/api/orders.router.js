import { Router } from "express";
//import orders from "../../data/fs/orders.fs.js";
import { orders} from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlwares/propsOrders.mid.js"

const ordersRouter = Router();

ordersRouter.post("/",propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);
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
    let filter = {}
    if (req.query.uid){
      filter = {uid: req.query.uid}
    }
    const all = await orders.read({filter});
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
    const one = await orders.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body
    const one = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      response: "update" + one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
