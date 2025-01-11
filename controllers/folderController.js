const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// To get all files
async function getFolders(req, res) {
    const folder = await prisma.folder.findMany({});
    console.log(folder)
    res.render('folders', {folders: folder})
}
// To get all files
async function getFiles(req, res) {
  const file = await prisma.file.findMany({});
  console.log(file)
  res.render('files', {files: file})
  }

// To get the file form
async function uploadFileInFolderGet(req, res) {
    res.render('folder');
    }

// To upload a file
async function uploadFileInFolderPost(req, res) {
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
            res.redirect('/order');
            
            // res.send({ message: 'Folder created and files uploaded successfully!' });
          } catch (error) {
            console.error(error);
            res.render({ message: 'Error creating folder or uploading files' });
          }
    }

async function getFolderId(req, res) {
    try {
            const { id }= req.params;
            const folder = await prisma.folder.findUnique({
              where: { id },
            });
        
            if (!folder) {
              res.status(404).send('Folder not found');
              return;
            }
        
            res.json(folder);
          
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    
    }

    async function getFileId(req, res) {
      try {
          const { id } = req.params;
          const file = await prisma.file.findUnique({
            where: { id },
            include: { folder: true },
          });
      
          if (!file) {
            res.status(404).send('File not found');
            return;
          }
      
          res.json(file);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      
      }
  
  

    // exports.getPostById = async (req, res) => {
    //   try {
    //     const { id } = req.params;
    //     const post = await prisma.post.findUnique({
    //       where: { id },
    //       include: { comments: true },
    //     });
    
    //     if (!post) {
    //       return res.status(404).json({ message: 'Post not found' });
    //     }
    //     // res.redirect('/api/post')
    //     res.json(post);
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Failed to retrieve post' });
    //   }
    // };
    
async function updateFolderId(req, res)  {
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

    }

async function deleteFolderId(req, res) {
    try {
            const id = (folder.id);
            await prisma.folder.delete({ where: { id } });
            res.send({ message: 'Folder deleted successfully' });
          } catch (err) {
            res.status(500).send({ message: 'Error deleting folder' });
          }

    }


    
    
module.exports = { getFolders, getFiles, uploadFileInFolderGet, uploadFileInFolderPost, getFolderId, getFileId, updateFolderId, deleteFolderId  };
    


