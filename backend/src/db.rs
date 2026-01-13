use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};

pub async fn init_db() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite::todos.db")
        .await
        .expect("Failed to connect to database");

    // Create table if it does not exist
    sqlx::query(
        r#"CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    completed BOOLEAN NOT NULL DEFAULT 0,
                    created_at DATETIME NOT NULL)"#,
    )
    .execute(&pool)
    .await
    .expect("Failed to create table");

    println!("Database initialized");

    pool
}
