const express = require("express");
const prisma = require("./prisma/index.js");
const app = express();
const employees = require("./prisma/seed.js");
const PORT = 4000;

app.use(express.json());

app.get((req, res) => {
  res.send("Welcome to the Prismatic Employees API.");
});

// the following gets the full array of employees
app.get("/", async (req, res) => {
  const employees = await prisma.employee.res.json(employees);
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
app.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = employees.find((element) => element.id === Number(id));
  if (!employee) {
    res.status(404).send("No employee with that id!");
  }
});
// updates employee with specified ID with provided data
app.put("/employees/:id", (req, res) => {
  const { name, id } = req.body;
  if (!name) {
    // send 400 if name not correctly provided
    return res.status(400).send("Name not correctly provided!");
  }
  if (!employee) {
    // send 404 if employee does not exist
    res.status(404).send("No employee with that id!");
  }
  // send updated employee with status 200
  res.status(200).json(employees);
});

// deletes employee with specified ID
app.delete("/employees/:id", (req, res) => {
  const id = req.params.id;
  employees = employees.filter((element) => element.id !== Number(id));
  if (!employee) {
    // send 404 if employee does not exist
    res.status(404).send("No employee with that id!");
  }
  // send just the status 204
  res.status(204);
});

app.listen(PORT, () => {
  console.log(`Running on the following http://localhost:${PORT}`);
});
