import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import customerController from "../../../controller/custometrController";
const { catchAsync, resHandler } = require("../../../utils");
const { customerAuthHandler } = require("../../../services/authenticator");

const apiRouter = nextConnect({
    onError(error, req, res) {
        resHandler(res, 500, `Internal server issue, ${error.message}`);
    },
    onNoMatch(req, res) {
        resHandler(res, 405, `Method '${req.method}' not allowed`);
    },
});

apiRouter
    .use(async (req, res, next) => {
        await dbConnect();
        return await customerAuthHandler(req, res, next);
    })
    .get(catchAsync(async (req, res) => {
        return await customerController.getCustomerData(req, res);
    }));

export const config = {
    api: {
        bodyParser: true,
    },
};

export default apiRouter;
