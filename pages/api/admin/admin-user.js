import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import adminController from "../../../controller/adminController";
import {adminAuthHandler} from "../../../services/authenticator";
import { catchAsync, resHandler } from "../../../utils";

const apiRouter = nextConnect({
    onError(error, req, res) {
        resHandler(res, 500, `Internal server issue: ${error.message}`);
    },
    onNoMatch(req, res) {
        resHandler(res, 405, `Method '${req.method}' not allowed`);
    },
});

apiRouter.use(
    catchAsync(async (req, res, next) => {
        await dbConnect();
        await adminAuthHandler(req, res, next);
    })
);

// Routes


apiRouter.post(
    catchAsync(async (req, res) => {
        res.setHeader("Allow", ["POST"]);
        await adminController.createAdminUser(req, res);
    })
);

apiRouter.put(
    catchAsync(async (req, res) => {
        res.setHeader("Allow", ["PUT"]);
        await adminController.updateAdminUser(req, res);
    })
);


export const config = {
    api: {
        bodyParser: true,
    },
};

export default apiRouter;
