<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

$db_path = __DIR__ . '/database.sqlite';
$response = [];

try {
    $pdo = new PDO('sqlite:' . $db_path);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get article_id from query string
    $article_id = isset($_GET['article_id']) ? trim($_GET['article_id']) : '';

    if (empty($article_id)) {
        $response['success'] = false;
        $response['message'] = 'Article ID is required';
    } else {
        // Prepare and execute SQL statement
        $stmt = $pdo->prepare("SELECT * FROM comments WHERE article_id = :article_id ORDER BY created_at DESC");
        $stmt->bindParam(':article_id', $article_id);
        $stmt->execute();

        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $response['success'] = true;
        $response['comments'] = $comments;
    }

} catch (PDOException $e) {
    $response['success'] = false;
    $response['message'] = "Database error: " . $e->getMessage();
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "An unexpected error occurred: " . $e->getMessage();
}

// Close connection
$pdo = null;

// Send JSON response
echo json_encode($response);
?> 