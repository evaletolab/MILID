<?php
// check sqlite is available and functioning
$ver = SQLite3::version();

echo $ver['versionString'] . "\n";
echo $ver['versionNumber'] . "\n";

var_dump($ver);
?>