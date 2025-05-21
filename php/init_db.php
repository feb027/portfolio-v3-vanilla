<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$db_path = __DIR__ . '/database.sqlite';
$message = '';

try {
    // Check if database file exists
    if (!file_exists($db_path)) {
        $message .= "Database file does not exist. Creating new database...<br>";
    } else {
        $message .= "Database file exists at: " . $db_path . "<br>";
    }

    // Create (connect to) SQLite database in file
    $pdo = new PDO('sqlite:' . $db_path);
    // Set errormode to exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $message .= "Database connected successfully.<br>";

    // Check if contacts table exists
    $tableExists = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'")->fetch();
    if (!$tableExists) {
        $message .= "Creating contacts table...<br>";
        // Create contacts table
        $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        $message .= "Table 'contacts' created successfully.<br>";
    } else {
        $message .= "Table 'contacts' already exists.<br>";
    }

    // Check if comments table exists
    $tableExists = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='comments'")->fetch();
    if (!$tableExists) {
        $message .= "Creating comments table...<br>";
        // Create comments table
        $pdo->exec("CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            article_id TEXT NOT NULL,
            name TEXT NOT NULL,
            comment_text TEXT NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        $message .= "Table 'comments' created successfully.<br>";
    } else {
        $message .= "Table 'comments' already exists.<br>";
    }

    // Show table structure
    $message .= "<br>Table Structure:<br>";
    $tables = ['contacts', 'comments'];
    foreach ($tables as $table) {
        $message .= "<br>Structure of table '$table':<br>";
        $columns = $pdo->query("PRAGMA table_info($table)")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($columns as $column) {
            $message .= "- {$column['name']} ({$column['type']})<br>";
        }
    }

} catch (PDOException $e) {
    $message .= "Error: " . $e->getMessage() . "<br>";
}

// Display messages
echo $message;

// Close connection
$pdo = null;
?> 