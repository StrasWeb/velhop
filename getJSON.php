<?php
/**
 * Convert XML API to JSON
 * 
 * PHP version 5.3.10
 * 
 * @category PHP
 * @package  Velhop
 * @author   Pierre Rudloff <rudloff@strasweb.fr>
 * @license  New BSD License http://opensource.org/licenses/BSD-3-Clause
 * @link     http://svn.strasweb.fr
 * */
header("Content-Type: application/json");
$xml = new DOMDocument();
$xml->loadXML(file_get_contents("http://velhop.strasbourg.eu/tvcstations.xml"));
$xml=$xml->documentElement;
$xml=$xml->childNodes->item(0);
for ($i=1; $i<$xml->childNodes->length; $i++) {
    $node=$xml->childNodes->item($i);
    if ($node->nodeName!="#text") {
        $nodes[]=array(
            "name"=>$node->getAttribute("na"), "lat"=>$node->getAttribute("la"),
            "long"=>$node->getAttribute("lg"),
            "max"=>$node->getAttribute("to"), "current"=>$node->getAttribute("av")
        );
    }
}
print(json_encode($nodes));
