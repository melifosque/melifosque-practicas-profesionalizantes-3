const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs'); // Agregamos el módulo fs para leer archivos

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'account_database',
});

/// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');

    // Leer el archivo cuentas.json
    fs.readFile('public/cuentas.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo cuentas.json:', err);
            return;
        }

        let cuentas;
        try {
            cuentas = JSON.parse(data).cuentas; // Obtén el array de cuentas
        } catch (parseError) {
            console.error('Error al parsear el contenido de cuentas.json:', parseError);
            return;
        }

        // Insertar cada cuenta en la base de datos
        cuentas.forEach(cuenta => {
            const { id, username, saldo } = cuenta;
            const sqlCheck = 'SELECT COUNT(*) AS count FROM account WHERE id = ?';
            db.query(sqlCheck, [id], (err, result) => {
                if (err) {
                    console.error('Error al verificar la existencia del id en la base de datos:', err);
                } else {
                    const count = result[0].count;
                    if (count === 0) {
                        const sqlInsert = 'INSERT INTO account (id, username, credit) VALUES (?, ?, ?)';
                        db.query(sqlInsert, [id, username, saldo], (err, result) => {
                            if (err) {
                                console.error('Error al insertar cuenta en la base de datos:', err);
                            } else {
                                console.log('Cuenta insertada correctamente:', cuenta);
                            }
                        });
                    } else {
                        console.log(`La cuenta con ID ${id} ya existe en la base de datos. No se insertará.`);
                    }
                }
            });
        });
    });
});

// Middleware para parsear JSON
app.use(express.json());

// Servir contenido estático desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para listar account
app.get('/account', (req, res) => {
    const sql = 'SELECT * FROM account';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener account de la base de datos' });
        } else {
            res.json(result);
        }
    });
});

// Middleware para analizar JSON
app.use(express.json());

// Ruta para crear una nueva cuenta
app.post('/account', (req, res) => {
    const { id, username, saldo } = req.body;
    const sql = 'INSERT INTO account (id, username, credit) VALUES (?, ?, ?)';
    db.query(sql, [id, username, saldo], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al crear cuenta en la base de datos' });
        } else {
            res.json({ message: 'Cuenta creada correctamente', nuevaCuenta: { id, username, saldo } });
        }
    });
});

// Ruta para editar una cuenta existente
app.put('/account/:id', (req, res) => {
    const id = req.params.id;
    const { username, saldo } = req.body;
    const sql = 'UPDATE account SET username = ?, credit = ? WHERE id = ?';
    db.query(sql, [username, saldo, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al editar cuenta en la base de datos' });
        } else {
            res.json({ message: 'Cuenta editada correctamente', id, username, saldo });
        }
    });
});

// Ruta para eliminar una cuenta existente
app.delete('/account/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM account WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar cuenta de la base de datos' });
        } else {
            res.json({ message: 'Cuenta eliminada correctamente', id });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
