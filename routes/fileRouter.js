const { Router } = require('express');
const fileRouter = Router();
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = multer({ dest: './uploads/' });


fileRouter.get('/file', (req, res) => {
    res.render('file');
    // if (req.isAuthenticated()) {
    //   res.send('Welcome, ' + req.user.username);
    // } else {
    //   res.redirect('/login');
    // }
  });
  
  fileRouter.post('/file', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const filename = file.originalname;
  
      // Save the file to the database
      await prisma.file.create({
        data: {
          filename: filename,
          
        },
      });
      
      res.send('File Uploaded Successfully');
    } catch (error) {
      console.error(error);
      res.render('file', { error: 'Internal Server Error' });
    }
  });


fileRouter.get('/file/:id', async (req, res) => {
  try {
    const fileId = (file.id);
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { folder: true },
    });

    if (!file) {
      res.status(404).send('File not found');
      return;
    }

    res.render('file-details', {
      file: file,
      folderName: file.folder.foldername,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

fileRouter.get('/file/:id/download', async (req, res) => {
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
});


  
module.exports = fileRouter;

