<?php
var_dump($_POST);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["username"]) && isset($_POST["id"]) && isset($_POST["password"])) {
        $fullname = $_POST["username"];
        $email = $_POST["id"];
        $password = $_POST["password"];
        //connectonline

        $conn = new mysqli("localhost", "root", "", "rent_ease");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO signup_rentease (username, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Error in SQL query: " . $conn->error);
        }

        $stmt->bind_param("sss", $fullname, $email, $password);

        if ($stmt->execute()) {
            header("Location: login.html");
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        echo "Please fill in all required fields.";
    }
}
?>
