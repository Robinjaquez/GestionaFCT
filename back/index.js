const express = require('express')
const cors = require('cors')
const db = require('./db');
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: "*/*" }))
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// CRUD de cada api

// --------------------------------Usuarios----------------------------------
app.get('/app/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});


//--------------------------------Alumnos----------------------------------
app.get('/app/alumnos', (req, res) => {
  db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});
app.get('/app/alumnos/:id', (req, res) => {
  const alumnoId = req.params.id;

  db.query('SELECT * FROM alumnos WHERE id = ?', [alumnoId], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(results[0]);
  });
});
app.post("/app/alumnos", (req, res) => {
  try {
    const alumno = req.body;

    db.query("INSERT INTO alumnos SET ?", alumno, (err, result) => {
      if (err) {
        console.error("Error al insertar el alumno:", err);
        return res.status(500).json({ error: "Error al registrar el alumno" });
      }
      res.status(201).json({ message: "Alumno registrado con éxito", id: result.insertId });
    });
  } catch (error) {
    console.error("Error al procesar la insercion:", error);
    res.status(500).json({ error: "Error al crear alumno" });
  }
});
app.delete("/app/alumnos/:id", (req, res) => {
  try {
    const alumnoId = req.params.id;
    db.query("DELETE FROM alumnos WHERE id = ?", [alumnoId], (err, result) => {
      if (err) {
        console.error("Error al eliminar el alumno:", err);
        return res.status(500).json({ error: "Error al eliminar el alumno" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Alumno no encontrado" });
      }
      res.status(200).json({ message: "Alumno eliminado con éxito", id: alumnoId });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al eliminar alumno" });
  }
});
app.put("/app/alumnos/:id", (req, res) => {
  try {
    const alumno = req.body;
    const alumnoId = req.params.id;
    db.query("UPDATE alumnos SET ? WHERE id = ?", [alumno, alumnoId], (err, result) => {
      if (err) {
        console.error("Error al actualizar el alumno:", err);
        return res.status(500).json({ error: "Error al actualizar el alumno" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Alumno no encontrado" });
      }
      res.status(200).json({ message: "Alumno actualizado con éxito", id: alumnoId });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al actualizar alumno" });
  }
});


// --------------------------------Empresas----------------------------------
app.get('/app/empresas', (req, res) => {
  db.query('SELECT * FROM empresas', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});
app.get('/app/empresas/:id', (req, res) => {
  const empresaId = req.params.id;
  db.query('SELECT * FROM empresas WHERE id = ?', [empresaId], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(results[0]);
  });
});
app.post("/app/empresas", (req, res) => {
  try {
    const empresa = req.body;

    db.query("INSERT INTO empresas SET ?", empresa, (err, result) => {
      if (err) {
        console.error("Error al insertar el alumno:", err);
        return res.status(500).json({ error: "Error al registrar el alumno" });
      }
      res.status(201).json({ message: "Empresa registrado con éxito", id: result.insertId });
    });
  } catch (error) {
    console.error("Error al procesar la insercion:", error);
    res.status(500).json({ error: "Error al crear alumno" });
  }
});
app.delete("/app/empresas/:id", (req, res) => {
  try {
    const empresaId = req.params.id;
    db.query("DELETE FROM empresas WHERE id = ?", [empresaId], (err, result) => {
      if (err) {
        console.error("Error al eliminar la empresa:", err);
        return res.status(500).json({ error: "Error al eliminar la empresa" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }
      res.status(200).json({ message: "Empresa eliminada con éxito", id: empresaId });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al eliminar la empresa" });
  }
});
app.put("/app/empresas/:id", (req, res) => {
  try {
    const empresas = req.body;
    const empresasId = req.params.id;
    db.query("UPDATE empresas SET ? WHERE id = ?", [empresas, empresasId], (err, result) => {
      if (err) {
        console.error("Error al actualizar la empresa:", err);
        return res.status(500).json({ error: "Error al actualizar la empresa" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Empresa no encontrado" });
      }
      res.status(200).json({ message: "Empresa actualizado con éxito", id: empresasId  });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al actualizar alumno" });
  }
});

// --------------------------------Contactos----------------------------------
app.get('/app/contactos', (req, res) => {
  db.query('SELECT * FROM contactos', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});
app.get('/app/contactos/:id', (req, res) => {
  const contactoId = req.params.id;
  db.query('SELECT * FROM contactos WHERE id = ?', [contactoId], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    res.json(results[0]);
  });
});
app.post("/app/contactos", (req, res) => {
  try {
    const contacto = req.body;

    db.query("INSERT INTO contactos SET ?", contacto, (err, result) => {
      if (err) {
        console.error("Error al insertar el Contacto:", err);
        return res.status(500).json({ error: "Error al registrar el Contacto" });
      }
      res.status(201).json({ message: "Contacto registrado con éxito", id: result.insertId });
    });
  } catch (error) {
    console.error("Error al procesar la insercion:", error);
    res.status(500).json({ error: "Error al crear el Contacto" });
  }
});
app.delete("/app/contactos/:id", (req, res) => {
  try {
    const contactoId = req.params.id;
    db.query("DELETE FROM contactos WHERE id = ?", [contactoId], (err, result) => {
      if (err) {
        console.error("Error al eliminar la empresa:", err);
        return res.status(500).json({ error: "Error al eliminar el Contacto" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Contacto no encontrado" });
      }
      res.status(200).json({ message: "Contacto eliminada con éxito", id: contactoId });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al eliminar el Contacto" });
  }
});
app.put("/app/contactos/:id", (req, res) => {
  try {
    const contactos = req.body;
    const contactosId = req.params.id;
    db.query("UPDATE contactos SET ? WHERE id = ?", [contactos, contactosId], (err, result) => {
      if (err) {
        console.error("Error al actualizar el contacto:", err);
        return res.status(500).json({ error: "Error al actualizar el contacto" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Contacto no encontrado" });
      }
      res.status(200).json({ message: "Contacto actualizado con éxito", id: contactosId  });
    });
  } catch (error) {
    console.error("Error al procesar la eliminación:", error);
    res.status(500).json({ error: "Error al actualizar el Contacto" });
  }
});


// --------------------------------Profesores----------------------------------
app.get('/app/profesores', (req, res) => {
  db.query('SELECT * FROM profesores', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});


// POST para insertar datos


// Delete para eliminar datos



