// prisma-session-store.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const EventEmitter = require('events');



class PrismaSessionStore  extends 
EventEmitter {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }
  async get(sessionId) {
    const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
    return session ? JSON.parse(session.data) : null;
  }

  async set(sessionId, sessionData) {
    const expires = new Date(Date.now() + 86400000); // 24 hours
    await this.prisma.session.upsert({
      where: { id: sessionId },
      create: { id: sessionId, data: JSON.stringify(sessionData), expires },
      update: { data: JSON.stringify(sessionData), expires },
    });
  }

  
async destroy(sessionId) {
  try {
    await this.prisma.session.delete({ where: { id: sessionId } });
  } catch (error) {
    if (error.code === 'P2025') { // Record to delete does not exist
      console.log(`Session ${sessionId} does not exist, ignoring deletion`);
    } else {
      throw error;
    }
  }
}


}



module.exports = PrismaSessionStore;
