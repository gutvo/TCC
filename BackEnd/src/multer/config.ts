import multer from "multer";

const upload = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload;

/*
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("imageData");

export default upload;


*/
