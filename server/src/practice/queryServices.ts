import { prisma } from "../lib/db.js";

const services = await prisma.service.findMany();
console.log(services);