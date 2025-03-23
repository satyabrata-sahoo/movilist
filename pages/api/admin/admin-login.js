import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import adminController from "../../../controller/adminController";
import { catchAsync, resHandler } from "../../../utils";

const apiRouter = nextConnect({
    onError: (error, req, res) => {
        return resHandler(res, 500, false, `Internal server error: ${error.message}`);
    },
    onNoMatch: (req, res) => {
        return resHandler(res, 405, false, `Method '${req.method}' not allowed`);
    },
});

apiRouter.post(
    catchAsync(async (req, res) => {
        res.setHeader("Allow", ["POST"]);
        await dbConnect();
        await adminController.adminLogin(req, res);
    })
);

export const config = {
    api: {
        bodyParser: true,
    },
};

export default apiRouter;
