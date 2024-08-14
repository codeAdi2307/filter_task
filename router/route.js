import Express  from "express";

import { fake_data,filter_data } from "../controller/user.cont.js";

const Router = Express.Router();

Router.post("/fake",fake_data)
Router.get("/item/:search",filter_data)


export default Router;