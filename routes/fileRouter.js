const { Router } = require('express');
const fileRouter = Router();
const folder = require('./folderRouter');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = multer({ dest: './uploads/' });
const fileController = require('../controllers/fileController')


   
// fileRouter.get('/order', fileController.getFiles)
fileRouter.get('/upload', fileController.uploadFileGet)
fileRouter.post('/upload', upload.single('file'), fileController.uploadFilePost)
fileRouter.get('/folder/:folderId/file/:fileId', fileController.getFileId)
fileRouter.get('/folder/:folderId/file/:fileId/download', fileController.downloadFileGet)


module.exports = fileRouter;

