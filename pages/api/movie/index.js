import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import movieControler from "../../../controller/movieControler";
import {adminAuthHandler} from "../../../services/authenticator";
const { catchAsync, resHandler } = require("../../../utils");
const { upload } = require("../../../services/fileUpload");

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
         await adminAuthHandler(req, res, next);
    })
    .use(upload.single("poster"))
    .post(catchAsync(async (req, res) => {
        return await movieControler.addMovie(req, res);
    }))
    .put(catchAsync(async (req, res) => {
        return await movieControler.updateMovie(req, res);
    }));

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apiRouter;
