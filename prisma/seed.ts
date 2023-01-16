import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const guest = await prisma.user.upsert({
    where: { email: "guest@kanban.lv" },
    update: {},
    create: {
      email: "guest@kanban.lv",
      name: "Guest",
      hashedPassword:
        "$2b$10$UG/x7GSZKZkYX9GSvO5oduWJ.ODs1sz2LCyJfHryFEjoCIto9nltS",
    },
  });
  console.log({ guest });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
