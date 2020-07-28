<?php

$TITLE   = 'Git Deployment Hamster';
$VERSION = '0.11';

echo <<<EOT
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>$TITLE</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
  o-o    $TITLE
 /\\"/\   v$VERSION
(`=*=') 
 ^---^`-.
EOT;

// Check whether client is allowed to trigger an update

$allowed_ips = array(
	'207.97.227.', '50.57.128.', '108.171.174.', '50.57.231.', '204.232.175.', '192.30.252.', // GitHub
	'195.37.139.','193.174.' // VZG
);
$allowed = true;

$headers = apache_request_headers();
/*
if (@$headers["X-Forwarded-For"]) {
    $ips = explode(",",$headers["X-Forwarded-For"]);
    $ip  = $ips[0];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

foreach ($allowed_ips as $allow) {
    if (stripos($ip, $allow) !== false) {
        $allowed = true;
        break;
    }
}
*/
if (!$allowed) {
	header('HTTP/1.1 403 Forbidden');
 	echo "<span style=\"color: #ff0000\">Sorry, no hamster - better convince your parents!</span>\n";
    echo "</pre>\n</body>\n</html>";
    exit;
}

flush();

// Actually run the update

$myhome = 'cd /home/kariiv/songlib-frontend/ && ';

$commands = array(
	'whoami',
	$myhome + 'git pull https://kariiv:thgLOJ1234@github.com/kariiv/songlib-frontend.git',
	$myhome + 'git status',
	$myhome + 'rm -rf ./node_modules',
	$myhome + 'npm install',
	$myhome + 'npm run build',
	$myhome + 'rm -rf ../public_html/music2/',
	$myhome + 'mkdir ../public_html/music2',
	$myhome + 'mv build/* ../public_html/music2/',
	$myhome + 'cp deploy.php ../public_html/music2/',
	$myhome + 'cp .htaccess ../public_html/music2/',
    'echo "Done!"',
);

$output = "\n";

$log = "####### ".date('Y-m-d H:i:s'). " #######\n";

foreach($commands AS $command){
    // Run it
    $tmp = shell_exec("$command 2>&1");
    // Output
    $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
    $output .= htmlentities(trim($tmp)) . "\n";

    $log  .= "\$ $command\n".trim($tmp)."\n";
}

$log .= "\n";

file_put_contents ('/home/kariiv/log/deploy-log.txt',$log,FILE_APPEND);

echo $output; 

?>
</pre>
</body>
</html>