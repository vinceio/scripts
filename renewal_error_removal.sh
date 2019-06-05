#!/bin/bash

FILE=$1

#Script Paths
CERTBOT=/usr/bin/certbot

# Colours for messages
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'


while read -r domain_name; do

    echo -en "------------------------------------ \n"
        echo -en "Removing Certificate for: \n"
        echo -en "${CYAN}Domain Name:${RESTORE} $domain_name \n"

    $CERTBOT delete --cert-name $domain_name

    if [ $? -ne 0 ]
        then
        echo -en "${RED}Error:${RESTORE} Certificate could not be deleted. \n";
        echo -en "\t ${CYAN}Domain Name:${RESTORE} $domain_name \n";
        exit 1;
    fi

    mv /etc/nginx/conf.d/$domain_name.conf /etc/nginx/conf.d/conf_archive/$domain_name.conf.old

    if [ $? -ne 0 ]
        then
        echo -en "${RED}Error:${RESTORE} Configuration file could not be archived\n";
        echo -en "\t ${CYAN}Domain Name:${RESTORE} $domain_name \n";
        exit 1;
    fi
done < "$1"
