const multer = require("multer");

//multer
const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const type = file.mimetype.split("/")[1];
        let filename = Date.now() + file.fieldname + "-0." + type;
        //파일 존재 여부 확인 후 이름 변경
        checkFile = () => {
            let fs = require("fs");
            let res = fs.existsSync(`uploads/${filename}`);
            if (res) {
                let a = filename.split("-");
                let b = Number(a[1].split(".")[0]);
                filename = `${file.fieldname}-${b + 1}.${type}`;
                checkFile();
            }
        };
        checkFile();

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
            type !== "gif"
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
