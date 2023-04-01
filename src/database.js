import mysql from "mysql2";

export const pool =
global.pool ||
mysql
.createPool({
host: process.env.MYSQLHOST,
user: process.env.MYSQLUSER,
password: process.env.MYSQLPASSWORD,
database: process.env.MYSQLDATABASE,
port: process.env.MYSQLPORT,
connectTimeout: 10000, // 10 seconds
})
.promise();

if (process.env.NODE_ENV !== "production") global.pool = pool;

// Posts

export async function getAllPosts() {
  const [rows] = await pool.query(
    "SELECT * FROM posts");
  return rows;
}

export async function getPostById(id) {
const [rows] = await pool.query(
  `
SELECT *, (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS totalComments, 
(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', comments.id, 'text', comments.text, 'userName', comments.userName,
'created', comments.created)) FROM comments WHERE comments.post_id = posts.id) AS comments 
FROM posts WHERE posts.id = ? 
`,
[id, id]
);

const post = rows[0];
return post
}

export async function updatePostById(id, name) {
await pool.query("UPDATE posts SET name = ? WHERE id = ?", [name, id]);
const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
return rows[0];
}

export async function createPost(name) {
await pool.query("INSERT INTO posts (name) VALUES (?)", [name]);
const [rows] = await pool.query(
"SELECT * FROM post WHERE id = LAST_INSERT_ID()"
);
return rows[0];
}

export async function deletePostById(id) {
await pool.query("DELETE FROM posts WHERE id = ?", [id]);
}

// Comments

export async function getAllComments(postId) {
const [rows] = await pool.query(
"SELECT * FROM comments WHERE post_id = ?",
[postId]
);
return rows;
}

export async function getCommentById(id) {
const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
return rows[0];
}

export async function updateCommentById(id, text) {
await pool.query("UPDATE comments SET text = ? WHERE id = ?", [text, id]);
const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
return rows[0];
}

export async function createComment(text, postId, userName) {
await pool.query(
"INSERT INTO comments (text, post_id, userName) VALUES (?, ?, ?)",
[text, postId, userName]
);
const [rows] = await pool.query(
"SELECT * FROM comments WHERE id = LAST_INSERT_ID()"
);
return rows[0];
}

export async function deleteCommentById(id) {
await pool.query("DELETE FROM comments WHERE id = ?", [id]);
}
