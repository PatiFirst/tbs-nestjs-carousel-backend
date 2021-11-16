import { memoryStorage } from "multer";
export const saveImageToStorage = {
    // storage: diskStorage({
    //     destination: './uploads',
    //     filename: (req, file, cb) => {
    //         const fileExtension: string = path.extname(file.originalname);
    //         const fileName: string = uuid4() + fileExtension;
    //         cb(null, fileName)
    //     },
    // }),
    // fileFilter: (req, file, callback) => {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //     return callback(new Error('Only image files are allowed!'), false);
    //     }
    //     callback(null, true);
    // },
        
    storage: memoryStorage()
}