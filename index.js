console.log("Using MySql with Node")

const express = require('express');
const mysql = require('mysql');

//Creating a database connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodemysql'
});

db.connect((err) => {
	if (err) throw err;
	console.log('MySql Connected...');
})

const app = express();

app.get('/', (req, res) => {
	res.send("Hello World!");
});

app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql, (err, result) => {
		if (err) throw new Error('Failed to create database...');
		console.log(result);
		res.send('Database created!');
	});
});

app.get('/createtable', (req, res) => {
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title varchar(200), body varchar(200), PRIMARY KEY (id))';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

app.get('/addpost', (req, res) => {
	let post = {title: 'Post One', body: 'This is post one'};
	let sql = 'INSERT INTO posts SET ?';
	db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post One added...');
	});
});

app.get('/addpost2', (req, res) => {
	let post = {title: 'Post Two', body: 'This is post two'};
	let sql = 'INSERT INTO posts SET ?';
	db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post two added...');
	});
});

app.get('/select', (req, res) => {
	let sql = 'SELECT * FROM posts';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts fetched...');
	});
});

app.get('/select/:id', (req, res) => {
	let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(`Post id ${req.params.id}  fetched...`);
	});
});

app.get('/update/:id', (req, res) => {
	let newTitle = 'This is updated post one';
	let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post updated...');
	});
});

app.get('/delete/:id', (req, res) => {
	let newTitle = 'This is updated post one';
	let sql = `DELETE from posts WHERE id = ${req.params.id}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post deleted...');
	});
});

app.listen('5000', () => {
	console.log('Server started on port 5000');
});