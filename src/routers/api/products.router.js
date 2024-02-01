import { Router } from "express";
//import products from "../../data/fs/products.fs.js"
import { products} from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlwares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/",propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {category: req.query.category} //{category : undefined} ==! category{}
    const order = {order: req.query.order} //{name : undefined} ==! name{}
    const all = await products.read({filter:{}, order:{}});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body
    const one = await products.update(pid,data);
    return res.json({
      statusCode: 200,
      response: "update: " + one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
