#!/bin/bash

#Archives .conf files in /etc/nginx/.conf to
#/etc/nginx/.conf/conf_archive
#AW: vincepaw Jan 7 2019


#Script Paths
CONFDIR="/etc/nginx/conf.d"
CONFARCHIVE="/etc/nginx/conf.d/conf_archive"

# Colours for messages
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'

#Checks file was provided
if [ -z "$1" ]; then
        echo -e "${CYAN}Usage${RESTORE}: $(basename $0) FILE"
        exit 1
fi

#Checks file exists
if [ ! -e "$1" ]; then
        echo -e "${RED}${1}${RESTORE}: File does not exist."
        exit 1
fi


#iterates over provided list of site names to archive
while read -r filename; do

        #Checks .conf file exists
        if [ ! -e "${CONFDIR}/${filename}.conf" ]; then
            echo -e "${RED}${filename}.conf${RESTORE}: Does not exist."
            exit 1
        else
            echo -e "Archiving ${GREEN}${filename}.conf${RESTORE}"
            mv "${CONFDIR}/${filename}.conf" "${CONFARCHIVE}/${filename}.conf.old"
        fi
done < "$1"
