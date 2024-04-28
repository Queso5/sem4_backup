<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["id"];
    $password = $_POST["password"];//password

    
    $conn = new mysqli("localhost", "root", "", "rent_ease");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    $sql = "SELECT * FROM signup_rentease WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error in SQL query: " . $conn->error);
    }

    
    $stmt->bind_param("ss", $email, $password);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            
            header("Location: dashboard.html"); 
            
            echo "Login failed. Please check your email and password.";
        }
    } else {
       
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
