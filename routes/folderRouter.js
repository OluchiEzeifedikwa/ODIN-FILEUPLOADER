const { Router } = require('express');
const folderRouter = Router();
const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const prisma = require('./prisma');
const app = express();

// Multer setup
const upload = multer({ dest: './uploads/' });


folderRouter.get('/folder', (req, res) => {
  res.render('folder');

});

// Get a list of all folders
folderRouter.get('/folder', async (req, res) => {
  try {
    const folders = await prisma.folder.findMany();
    res.send(folders);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching folders' });
  }
});

// Create a new folder and upload file
folderRouter.post('/folder', upload.array('uploads'), async (req, res) => {
  try {
    const { foldername } = req.body;
    const files = req.files;

    const folder = await prisma.folder.create({
      data: {
        foldername
      },
    });

    await Promise.all(files.map(async (file) => {
      await prisma.file.create({
        data: {
          filename: file.originalname,
          folderId: (folder.id),
        },
      });
    }));
    res.send({ message: 'Folder created and files uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.render({ message: 'Error creating folder or uploading files' });
  }
});


// Update a folder
app.put('/folder/:id', async (req, res) => {
  try {
    const id = (folder.id);
    const { foldername, parentId } = req.body;
    const folder = await prisma.folder.update({
      where: { id },
      data: { foldername, parent: { connect: { id: parentId } } },
    });
    res.send(folder);
  } catch (err) {
    res.status(500).send({ message: 'Error updating folder' });
  }
});

// Delete a folder
app.delete('/folder/:id', async (req, res) => {
  try {
    const id = (folder.id);
    await prisma.folder.delete({ where: { id } });
    res.send({ message: 'Folder deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting folder' });
  }
});

//Get a list of files in a folder
app.get('/folders/:id/files', async (req, res) => {
  try {
    const id = (folder.id);
    const files = await prisma.file.findMany({ where: { folderId: id } });
    res.send(files);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching files' });
  }
}) ;

// // Upload a file to a folder
// app.post('/folders/:id/files', upload.single('file'), async (req, res) => {
//   try {
//     const id = (link unavailable);
//     const fileName = req.file.originalname;
//     const file = await prisma.file.create({
//       data: { name: fileName, folder: { connect: { id } } },
//     });
//     res.send(file);
//   } catch (err) {
//     res.status(500).send({ message: 'Error uploading file' });
//   }
// });
module.exports = folderRouter;