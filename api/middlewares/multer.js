const multer = require("multer");

//multer
const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {

        const type = file.mimetype.split("/")[1];
        let filename = Date.now() + file.fieldname + "." + type;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {

    if (file) {
        const type = file.mimetype.split("/")[1];
        if (
            type !== "jpeg" &&
            type !== "jpg" &&
            type !== "png" &&
            type !== "mp4"
        ) {
            return cb({ msg: "파일 형식이 올바르지 않습니다." }, false);
        }
        cb(null, true);
    }
};

module.exports = multer({
    storage: _storage,
    fileFilter: fileFilter,
}).single("filename");
