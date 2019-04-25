#!/bin/bash
#Script for user creation

# Colours for messages
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'

#Parses through user input options
# --user (-u), --password (-p), --key (-k)
for i in "$@"
 do 
 case $i in
    -u=*|--user=*)
    USER_ADD="${i#*=}"
    shift   
    ;;      
    -p=*|--password=*)
    PASSWORD="${i#*=}"
    shift   
    ;;      
    -k=*|--key=*)
    KEY="${i#*=}"
    shift   
    ;;             
    *)      
    ;;      
  esac    
done


if  [ [ ! -z "${USER_ADD}" ] -o [ ! -z "${PASSWORD}" ]  -o [ ! -z "${KEY}" ] ]; then
    HELP=true
    echo -en "${RED}Error:${RESTORE} Please specify User, Password, and Key. \n";
fi


echo "${USER_ADD}, ${PASSWORD}, ${KEY}\n";

if [ "$HELP" = true ]; then
    echo -en "Usage: ./add_user.sh (options) \nOptions:\n   --user (-u)\n   --password (-p)\n   --key (-k)\n  Example: ${GREEN}./add_user.sh -u=tester -p=goteamblue -k=rsa_key.pub ${RESTORE} \n";
    exit 1;
fi

useradd ${USER_ADD} -G wheel
echo "${PASSWORD}" | passwd --stdin ${USER_ADD}
passwd --expire ${USER_ADD}
chage -l ${USER_ADD}
mkdir /home/${USER_ADD}/.ssh
echo "${KEY}" > /home/${USER_ADD}/.ssh/authorized_keys
sudo chown -R ${USER_ADD} /home/${USER_ADD}/.ssh
sudo chmod 700 /home/${USER_ADD}/.ssh
sudo chmod 600 /home/${USER_ADD}/.ssh/authorized_keys
echo -en "${USER_ADD} added.\n"
exit 1;
