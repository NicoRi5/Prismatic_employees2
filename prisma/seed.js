const prisma = require("./index");

const seed = async () => {
  const userObj = [
    { name: "Whitney" },
    { name: "Daniel" },
    { name: "Erny" },
    { name: "Tyrese" },
    { name: "Shanon" },
    { name: "Gerard" },
    { name: "Manny" },
    { name: "Elizabeth" },
    { name: "Preston" },
    { name: "Yolanda" },
  ];
  console.log("Hello");
  await prisma.employee.createMany({ data: userObj });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
