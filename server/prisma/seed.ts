import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [
{ name: "Haircut", durationMin: 60, priceCents: 5000 },
{ name: "Eyebrows", durationMin: 20, priceCents: 1000 },
{ name: "Head massage", durationMin: 15, priceCents: 1000 },
{ name: "Beard trim", durationMin: 20, priceCents: 1500 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());