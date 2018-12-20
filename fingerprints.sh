#!/bin/bash
#prints public key finger prints from specified file

Green='\033[0;32m'
if [ "$#" -ne 1 ]; then
		echo -e " Error! Specify Path to Public Keys: ${Green}fingerprint ~/path/to/key"
		exit 1
fi

if [ ! -e /tmp/key ]; then
		echo >> /tmp/key
fi

while read line
		do
				cat > /tmp/key <(echo $line)
				ssh-keygen -lf /tmp/key
		done < "$1"
rm /tmp/key
