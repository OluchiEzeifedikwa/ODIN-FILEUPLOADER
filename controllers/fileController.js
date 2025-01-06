const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// To get all files
// async function getFiles(req, res) {
//     const file = await prisma.file.findMany({});
//     console.log(file)
//     res.render('files', {files: file})
//     }
// To get the file form
async function uploadFileGet(req, res) {
    res.render('uploadFile');
    }
// To upload a file
async function uploadFilePost(req, res) {
    try {
        const file = req.file;
        const filename = file.originalname;
    
          
        // Save the file to the database
        await prisma.file.create({
          data: {
            folderId: req.params.id,
            filename: filename,
          },
        });
        res.redirect('/upload');
        // res.send('File Uploaded Successfully');
        } catch (error) {
          console.error(error);
          res.render('uploadFile', { error: 'Internal Server Error' });
        }
    }

async function getFileId(req, res) {
    try {
        const fileId = req.params.id;
        const file = await prisma.file.findUnique({
          where: { id: fileId },
          include: { folder: true },
        });
    
        if (!file) {
          res.status(404).send('File not found');
          return;
        }
    
        res.render('files', {
          file: file,
          folderName: file.folder.foldername,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    
    }


async function downloadFileGet(req, res) {
    try {
        const fileId = (file.id);
        const file = await prisma.file.findUnique({
          where: { id: fileId },
        });
    
        if (!file) {
          res.status(404).send('File not found');
          return;
        }
    
        const filePath = `./uploads/${file.filename}`;
        res.download(filePath, file.filename);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }

    
    
module.exports = {  uploadFileGet, uploadFilePost, getFileId, downloadFileGet  };
    