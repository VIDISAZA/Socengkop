import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);
  
  await prisma.user.upsert({
    where: { email: "admin@koperasi.com" },
    update: {},
    create: {
      email: "admin@koperasi.com",
      name: "Admin Koperasi",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "member@koperasi.com" },
    update: {},
    create: {
      email: "member@koperasi.com",
      name: "Member Koperasi",
      passwordHash,
      role: "MEMBER",
    },
  });
  
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
