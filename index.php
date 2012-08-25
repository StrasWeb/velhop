<?php
/**
 * Index file
 * 
 * PHP version 5.3.10
 * 
 * @category PHP
 * @package  Velhop
 * @author   Pierre Rudloff <rudloff@strasweb.fr>
 * @license  New BSD License http://opensource.org/licenses/BSD-3-Clause
 * @link     http://svn.strasweb.fr
 * */
header("Content-Type: text/html; charset=utf-8");
require_once "dom-enhancer/XMLDocument.php";
$doc=new DOMenhancer_XMLDocument("Vélhop", true);
$dom=$doc->DOM;

//<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
$dom->head->addElement(
    "script", null, array("src"=>"http://www.openlayers.org/api/OpenLayers.js")
);


//<div id="mapdiv"></div>
$dom->body->addElement("div", null, array("id"=>"mapdiv", "class"=>"map"));
$dom->body->addElement("script", null, array("src"=>"script.js", "async"=>"async"));


print($doc->display());
