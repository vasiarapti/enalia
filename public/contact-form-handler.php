<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

// ---- Ρυθμίσεις ----
$fromEmail = "no-reply@enalia-therapy.gr"; // το email αποστολέα (δημιούργησέ το στο cPanel)
$fromName  = "Enalia Therapy Website";

// Ελέγχουμε το honeypot (spam bots)
if (!empty($_POST['website'])) {
    die("Spam detected.");
}

// Συλλογή δεδομένων από τη φόρμα
$name      = trim($_POST['name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$service   = trim($_POST['service'] ?? '');
$therapist = trim($_POST['therapist'] ?? '');
$preferred = trim($_POST['preferred'] ?? '');
$message   = trim($_POST['message'] ?? '');

// Προς ποιον θεραπευτή θα πάει
if (stripos($therapist, "Καραβάνα") !== false) {
    $toEmail = "ekaravana@enalia-therapy.gr";
} else {
    $toEmail = "chkostikidis@enalia-therapy.gr";
}

// Δημιουργία email
$mail = new PHPMailer(true);

try {
    // SMTP ρυθμίσεις (από cPanel)
    $mail->isSMTP();
    $mail->Host       = "mail.enalia-therapy.gr"; // ✅ το hostname του mail server σου
    $mail->SMTPAuth   = true;
    $mail->Username   = "no-reply@enalia-therapy.gr"; // user
    $mail->Password   = "Enalia2025!";    // pass
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // From / To
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail);

    // Περιεχόμενο
    $mail->isHTML(true);
    $mail->Subject = "Νέα επικοινωνία από τον ιστότοπο";
    $mail->Body    = "
        <h3>Στοιχεία Επικοινωνίας</h3>
        <p><b>Όνομα:</b> {$name}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Τηλέφωνο:</b> {$phone}</p>
        <p><b>Υπηρεσία:</b> {$service}</p>
        <p><b>Θεραπευτής:</b> {$therapist}</p>
        <p><b>Προτιμώμενος τρόπος:</b> {$preferred}</p>
        <p><b>Μήνυμα:</b><br>{$message}</p>
    ";

    if ($mail->send()) {
        echo "Η φόρμα υποβλήθηκε με επιτυχία!";
    } else {
        echo "Υπήρξε πρόβλημα στην αποστολή.";
    }
} catch (Exception $e) {
    echo "Σφάλμα: {$mail->ErrorInfo}";
}
