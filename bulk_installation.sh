#!/bin/bash
#Script for bulk ssl installation

FILE=$1

#Script Paths
LE_CERT=/var/www/ssl_automation/le_nginx_configurator.sh
CERTBOT=/usr/bin/certbot

# Colours for messages
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'



# Reads lines in from user provided file
while read -r domain_name d6_name; do


        echo -en "------------------------------------ \n"
        echo -en "Installing Certificate for: \n"
        echo -en "${CYAN}Domain Name:${RESTORE} $domain_name \n"
        echo -en "${CYAN}D6 Name:${RESTORE} $d6_name \n"

        #Initializes server configuration for site
        bash $LE_CERT --domain="$domain_name" --d6name="$d6_name"

        #If script returns unsuccessful exit
        if [ $? -ne 0 ]
                then
                echo -en "${RED}Error:${RESTORE} LE Certificate Configuration Error \n";
                echo -en "\t ${CYAN}Domain Name:${RESTORE} $domain_name \n";
                echo -en "\t ${CYAN}D6_Name: ${RESTORE} $d6_name \n";
                exit 1;
        fi

        #Installs certificate with certbot
        $CERTBOT certonly --webroot -w /var/www/individual -d "$domain_name"

        if [ $? -ne 0 ]
                then
                echo -en "${RED}Error:${RESTORE} CERTBOT Certificate Creation Error \n";
                echo -en "\t ${CYAN}Domain Name:${RESTORE} $domain_name \n";
                echo -en "\t ${CYAN}D6_Name: ${RESTORE} $d6_name \n";
                 exit 1;
        fi

        #Finalizes server configuration for site
        bash $LE_CERT --domain="$domain_name" --d6name="$d6_name" --finalize=1


        if [ $? -ne 0 ]
                then
                echo -en "${RED}Error:${RESTORE} LE Certificate Finalization Error \n";
                echo -en "\t ${CYAN}Domain Name:${RESTORE} $domain_name \n";
                echo -en "\t ${CYAN}D6_Name: ${RESTORE} $d6_name \n";
                exit 1;
        fi

        echo -en "${GREEN}Installation Successful${RESTORE} \n";

done < "$1"












