<?php
/* ============================================
   API Configuration
   Copy this file to config.php and fill in
   your values.
   ============================================ */

// ============================================
// Lead Storage API (leads.php)
// Shared secret that gates admin-only endpoints
// (list / update / delete). MUST match the value
// of REACT_APP_LEADS_ADMIN_KEY used by the admin
// panel build. Generate a long random string.
// ============================================
define('ADMIN_API_KEY', 'CHANGE_ME_TO_A_LONG_RANDOM_STRING');
