'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
const MySQL = require('mysql');
//const Bcrypt = require('bcryptjs');
//const bodyParser = require('body-parser');


// Create a server with a host and port
const server = new Hapi.Server();
const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});

server.connection({
    host: 'localhost',
    port: 8000
});

connection.connect();

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply('Welcome to user Api .  /users to get user listing , /add to add new user , /edit/id to update user');
    }
});


/**
 * Get User by userId
 */
server.route({
    method: 'POST',
    path: '/login/',
    handler: function (request, reply) {
		
        const email = request.payload.email;
		const password = request.payload.password;

        connection.query('SELECT count(id) AS uID FROM users WHERE email = "' + email + '" AND password = "'+ password +'"',
            function (error, results, fields) {
				console.log('SELECT count(id) AS uID FROM users WHERE email = "' + email + '" AND password = "'+ password +'"');
                if (error) throw error;

                reply(results);
            });
    },
    config: {
        validate: {
            params: {
                email: Joi.string().email(),
				password:[Joi.string(), Joi.number()]
            }
        }
    }
});

/*
Get user listing 
 */
server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
        connection.query('SELECT * FROM users',
            function (error, results, fields) {
                if (error) throw error;

                reply(results);
            });
    }
});

/**
 * Get User by userId
 */
server.route({
    method: 'GET',
    path: '/user/{uid}',
    handler: function (request, reply) {
        const uid = request.params.uid;

        connection.query('SELECT * FROM users WHERE id = "' + uid + '"',
            function (error, results, fields) {
                if (error) throw error;

                reply(results);
            });
    },
    config: {
        validate: {
            params: {
                uid: Joi.number().integer()
            }
        }
    }
});

/**
 * Post service 
 */
server.route({
    method: 'POST',
    path: '/add',
    handler: function (request, reply) {

        const name = request.payload.name;
        const address = request.payload.address;
        const email = request.payload.email;
        const phone = request.payload.phone;
		const password = request.payload.password;

		//Encryption
		//var salt = Bcrypt.genSaltSync();
		//var encryptedPassword = Bcrypt.hashSync(password, salt);

		//Decrypt
		//var orgPassword = Bcrypt.compareSync(password, encryptedPassword);

        connection.query('INSERT INTO users (name,address,email,phone,password) VALUES  ("' + name + '", "' + address + '", "' + email + '", "' + phone + '","'+ password +'")',
            function (error, results, fields) {
                if (error) throw error;
                reply(results);
            });
    },
    config: {
        validate: {
            payload: {
                name: Joi.string().alphanum().min(2).max(30).required(),
                address: [Joi.string(), Joi.number()],
                email: Joi.string().email(),
                phone: Joi.number(),
				password:[Joi.string(), Joi.number()]
            }
        }
    }
});


/**
 * Pur Request
 * update service 
 */
server.route({
    method: 'POST',
    path: '/edit/{id}',
    handler: function (request, reply) {

        const id = request.params.id;
        const name = request.payload.name;
        const address = request.payload.address;
        const email = request.payload.email;
        const phone = request.payload.phone;

        connection.query('UPDATE users SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?', [name, address, email, phone, id],
            function (error, results, fields) {
                if (error) throw error;
                reply(results);
            });
    },
    config: {
        validate: {
            payload: {
                name: Joi.string().alphanum().min(2).max(30).required(),
                address: [Joi.string(), Joi.number()],
                email: Joi.string().email(),
                phone: Joi.number(),
                id: Joi.number()
            }
        }
    }
});


/**
 * Delete user
 */
server.route({
    method: 'DELETE',
    path: '/user/{id}',
    handler: function (request, reply) {
        const id = request.params.id;
        connection.query('DELETE FROM users WHERE id = ' + id,
            function (error, result, fields) {
                if (error) throw error;
                if (result.affectedRows) {
                    reply(true);
                } else {
                    reply(false);
                }
            });
    },
    config: {
        validate: {
            params: {
                id: Joi.number().integer()
            }
        }
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});