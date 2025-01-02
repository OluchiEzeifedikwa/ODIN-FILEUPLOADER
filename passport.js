// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// passport.use(
//   new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//   },
//     async (username, password, done) => {
//     try {
//       const user = await prisma.user.findUnique({ where: { username } });
//       // const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//       // const user = rows[0];
//       const match = await bcrypt.compare(password, user.password);
      

//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
      
//       if (!match) {
//         return done(null, false, { message: "Incorrect password" })
//       }

//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });
//     // const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     // const user = rows[0];

//     done(null, user);
//   } catch(err) {
//     done(err);
//   }
// });

// module.exports = passport;

