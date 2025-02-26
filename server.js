const express = require("express");
const prisma = require("./prisma/index.js");
const app = express();
const employees = require("./prisma/seed.js");
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Prismatic Employees API." });
});

// the following gets the full array of employees
// changed to prisma, error kept occurring!!
app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
});

// create new employee and add it to database (prisma.employee.create)

app.post("/employees", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Name not correctly provided!");
    }
    const newEmployee = await prisma.employee.create({
      data: {
        name,
      },
    });
    res.status(201).send(newEmployee);
    // catch added below due to prettier issue: catch or finally expected
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create a new employee!" });
  }
});

// sends employee with specified ID and sends a 404 if employee does not exist
app.get("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(req.params.id, 10) }, //changed due to errors
  });
  if (!employee) {
    return res.status(404).send("No employee with that id!");
  }
  res.json(employee);
});

// updates employee with specified ID with provided data
app.put("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    // send 400 if name not correctly provided
    return res.status(400).send("Name not correctly provided!");
  }
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!employee) {
    // send 404 if employee does not exist
    return res.status(404).send("No employee with that id!");
  }
  const updatedEmployee = await prisma.employee.update({
    where: { id: parseInt(id) },
    data: { name },
  });
  // send updated employee with status 200
  res.status(200).json(updatedEmployee);
});

// deletes employee with specified ID
app.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!employee) {
    // send 404 if employee does not exist
    return res.status(404).send("No employee with that id!");
  }
  await prisma.employee.delete({
    where: { id: parseInt(id) },
  });
  // send just the status 204
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
