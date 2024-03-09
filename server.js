const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10; // Número de rondas de sal para bcrypt

app.use(cors());
app.use(bodyParser.json());

// Endpoint para registro
app.post('/signup', async (req, res) => { //cambiado name por username y surname por usersurname
  const { username, usersurname, email, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = db.users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crea un nuevo usuario
    const newUser = { id: db.users.length + 1, username, usersurname, email, password: hashedPassword };
    db.users.push(newUser);

    // Guarda el nuevo array de usuarios en db.json
    fs.writeFile('./db.json', JSON.stringify(db, null, 2), async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the user' });
      }

      // Crea un token para el nuevo usuario
      const token = jwt.sign({ userId: newUser.id }, 'secret_key', { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing the password' });
  }
});


// Endpoint para manejar las solicitudes POST a /login
app.post('/account/login', (req, res) => {
  const { email, password } = req.body;
  // Encuentra al usuario por email
  const user = db.users.find(u => u.email === email);

  if (user) {
    // Compara la contraseña proporcionada con la contraseña hasheada almacenada
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error al comparar contraseñas' });
      }

      if (isMatch) {
        // Si las contraseñas coinciden, crea un token y responde exitosamente
        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        // Si las contraseñas no coinciden, responde con error
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Ruta de ejemplo para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(db.users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
