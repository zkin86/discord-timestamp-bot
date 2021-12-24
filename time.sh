#!/bin/bash
date=$1
if [ $# = "2" ]
  then
    format=$2
  else 
    format="f"
fi
echo "<t:$(date --date="${date}" +%s):${format}>"
