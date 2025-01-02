
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function main() {
    // await prisma.folder.create({
    //     data: {
    //         username: 'Bayo',
    //         password: '1234',
            
    //     }
    // })

    // const allUsers = await prisma.file.findMany({
        
    //      })
    //      console.dir(allUsers, {depth: null})
    //      }


         
            
    const file = await prisma.file.findMany({
        // where: { id: '1' },
        // include: { folder: true },
    })
    
    console.dir(file, {depth: null})
}

        

         


    // const tableName = prisma.model_models[user].tableName;
    // console.log(tableName);

//     const post = await prisma.post.update({
//     where: {id : 1},
//     data: {published: true},

    
// })
// console.log(post)
// }
    
main()
.then(async () => {
    await prisma.$disconnect()
})

.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
});

