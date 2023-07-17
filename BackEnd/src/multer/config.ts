import multer from 'multer';

const upload = multer({
    limits: {
      fieldSize: 10 * 1024 * 1024, // 10MB
    },
  });

  export default upload