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
error_log("Received request: " . $_SERVER['REQUEST_METHOD']);

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
    error_log("POST data: " . print_r($_POST, true));

    $pdo = new PDO('sqlite:' . $db_path);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? ''); // Subject might be optional
    $message_text = trim($_POST['message'] ?? '');

    // Log processed data
    error_log("Processed data - Name: $name, Email: $email, Message: $message_text");

    // Basic validation
    if (empty($name) || empty($email) || empty($message_text)) {
        $response['success'] = false;
        $response['message'] = 'Please fill in all required fields (Name, Email, Message).';
        error_log("Validation failed: Empty required fields");
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Invalid email format.';
        error_log("Validation failed: Invalid email format");
    } else {
        // Prepare and execute SQL statement
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (:name, :email, :subject, :message)");
        
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':subject', $subject);
        $stmt->bindParam(':message', $message_text);
        
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Thank you! Your message has been sent successfully.';
            error_log("Data successfully inserted into database");
        } else {
            $response['success'] = false;
            $response['message'] = 'Error: Could not save your message to the database.';
            error_log("Failed to insert data into database");
        }
    }

} catch (PDOException $e) {
    $response['success'] = false;
    $response['message'] = "Database error: " . $e->getMessage();
    error_log("Database error: " . $e->getMessage());
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "An unexpected error occurred: " . $e->getMessage();
    error_log("Unexpected error: " . $e->getMessage());
}

// Close connection
$pdo = null;

// Log response
error_log("Sending response: " . json_encode($response));

// Send JSON response
echo json_encode($response);
?> 