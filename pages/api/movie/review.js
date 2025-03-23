import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import movieControler from "../../../controller/movieControler";
const { catchAsync, resHandler } = require("../../../utils");
const { customerAuthHandler } = require("../../../services/authenticator")

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
        customerAuthHandler(req, res, next);
    })
    .post(catchAsync(async (req, res) => {
        return await movieControler.addReview(req, res);
    }))
    .put(catchAsync(async (req, res) => {
        return await movieControler.updateReview(req, res);
    }));

export const config = {
    api: {
        bodyParser: true,
    },
};

export default apiRouter;
