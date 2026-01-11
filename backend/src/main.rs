use axum::{
    Router,
    routing::{delete, get, post, put},
};
use tower_http::cors::CorsLayer;

mod db;
mod handlers;
mod models;

#[tokio::main]
async fn main() {
    // Initialize database
    let pool = db::init_db().await;

    // Build our application with routes
    let app = Router::new()
        .route("/api/todos", get(handlers::get_todos))
        .route("/api/todos", post(handlers::create_todo))
        .route("/api/todos/:id", put(handlers::update_todo))
        .route("/api/todos/:id", delete(handlers::delete_todo))
        .layer(CorsLayer::permissive())
        .with_state(pool);

    // Run the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!("Server running on http://{:?}", listener);

    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
