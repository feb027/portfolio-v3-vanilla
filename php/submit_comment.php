<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Log incoming request
error_log("Received comment request: " . $_SERVER['REQUEST_METHOD']);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit();
}

$db_path = __DIR__ . '/database.sqlite';
$response = [];

try {
    // Log POST data
    error_log("Comment POST data: " . print_r($_POST, true));

    $pdo = new PDO('sqlite:' . $db_path);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $article_id = trim($_POST['article_id'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $comment_text = trim($_POST['comment'] ?? '');

    // Log processed data
    error_log("Processed comment data - Article ID: $article_id, Name: $name, Comment: $comment_text");

    // Basic validation
    if (empty($article_id) || empty($name) || empty($comment_text)) {
        $response['success'] = false;
        $response['message'] = 'Mohon isi semua field yang diperlukan (Nama dan Komentar).';
        error_log("Comment validation failed: Empty required fields");
    } else {
        // Prepare and execute SQL statement
        $stmt = $pdo->prepare("INSERT INTO comments (article_id, name, comment_text) VALUES (:article_id, :name, :comment_text)");
        
        $stmt->bindParam(':article_id', $article_id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':comment_text', $comment_text);
        
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Terima kasih! Komentar Anda telah berhasil dikirim.';
            $response['comment'] = [
                'id' => $pdo->lastInsertId(),
                'name' => $name,
                'comment_text' => $comment_text,
                'created_at' => date('Y-m-d H:i:s')
            ];
            error_log("Comment successfully inserted into database");
        } else {
            $response['success'] = false;
            $response['message'] = 'Error: Tidak dapat menyimpan komentar ke database.';
            error_log("Failed to insert comment into database");
        }
    }

} catch (PDOException $e) {
    $response['success'] = false;
    $response['message'] = "Database error: " . $e->getMessage();
    error_log("Comment database error: " . $e->getMessage());
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "An unexpected error occurred: " . $e->getMessage();
    error_log("Comment unexpected error: " . $e->getMessage());
}

// Close connection
$pdo = null;

// Log response
error_log("Sending comment response: " . json_encode($response));

// Send JSON response
echo json_encode($response);
?> 