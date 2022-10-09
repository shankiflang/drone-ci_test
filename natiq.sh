#!/bin/sh

trap_ctrlc() {
    if [ $STOP_STEP -eq 1 ]; then
    printf "
-----------------------------------------------
          Exporting Flows and Settings
-----------------------------------------------
"
        while true
        do
            read -r -p "Would you like to export? [y/n] " input
        
            case $input in
                    [yY][eE][sS]|[yY])
                        (cd directus/scripts && yarn run export)
                        printf "\r\033[1;32m%s\033[0m\n" "Exporting Flows and Settings ✅"
                        yes '' | head -n1
                        (cd next && yarn run codegen)
                        printf "\r\033[1;32m%s\033[0m\n" "Exporting Codegen ✅"
                        yes '' | head -n1
                        docker-compose run --rm directus npx directus schema snapshot --yes //directus//snapshots//snapshot.yaml
                        printf "\r\033[1;32m%s\033[0m\n" "Exporting Snapshot ✅"
                        yes '' | head -n1
                        break
                        ;;
                    [nN][oO]|[nN])
                        printf '\r\e[31m%s\e[0m\n' "Exporting Aborted"
                        break
                        ;;
                    *)
                        printf '\r\e[31m%s\e[0m\n' "Invalid input..."
                        ;;
            esac      
        done
    fi
    exit 1
}

trap trap_ctrlc INT

############################################################
# CheckCommand                                             #
############################################################
CheckCommand() 
{
    printf "
    -----------------------------------------------
                Checking commands exists           
    -----------------------------------------------
    "
    # Check if openssl exists
    if ! type "openssl" > /dev/null; 
    then
        printf '\r\e[31m%s\e[0m\n' "Please install Openssl"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "openssl command found ✅"

    # Check if docker exists
    if ! type "docker" > /dev/null; 
    then
        printf '\r\e[31m%s\e[0m\n' "Please install Docker"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "docker command found ✅"

    # Check if docker exists
    if ! type "docker-compose" > /dev/null; 
    then
        printf '\r\e[31m%s\e[0m\n' "Please install docker-compose"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "docker-compose command found ✅"

    # Check if admin endpoint exists
    grep "admin.localhost" -c /etc/hosts > /dev/null
    if [ $? -gt 0 ];
    then
        printf '\r\e[31m%s\e[0m\n' "You need to add admin.localhost to your hosts file (/etc/hosts)"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "local domain command found ✅"

    # Check if node exists
    if ! type "node" > /dev/null; 
    then
        printf '\r\e[31m%s\e[0m\n' "Please install nodejs"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "node command found ✅"

    # Check if yarn exists
    if ! type "yarn" > /dev/null; 
    then
        printf '\r\e[31m%s\e[0m\n' "Please install yarn"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "yarn command found ✅"
    yes '' | head -n1
}

############################################################
# CreateCA                                                 #
############################################################
CreateCA() {
printf "
    -----------------------------------------------
                       CA files 
    -----------------------------------------------
"
DOMAIN=localhost
PASS=natiqPassword
mkdir -p docker/nginx/certs
if [ ! -f ~/ca/ca.key ] || [ ! -f ~/ca/ca.pem ]
then

    mkdir -p ~/ca/

    printf "\r\033[1;32m%s\033[0m\n" "Creating CA files"
    openssl genrsa -passout pass:$PASS -des3 -out ~/ca/ca.key 2048
    openssl req -passin pass:$PASS -x509 -new -nodes -key ~/ca/ca.key -sha256 -days 1825 -out ~/ca/ca.pem -subj "/C=FR/ST=Paris/L=Paris/O=Natiq/OU=IT/CN=$DOMAIN"

    OS="`uname`"
    case $OS in
    'Linux')
        if ! type "update-ca-certificates" > /dev/null; 
        then
            sudo apt-get install -y ca-certificates
        fi
        sudo cp ~/ca/ca.pem /usr/local/share/ca-certificates/ca.crt
        sudo update-ca-certificates
        if type "powershell.exe" > /dev/null; 
        then
            sudo mkdir -p /mnt/c/ca/
            sudo cat ~/ca/ca.pem > /mnt/c/ca/ca.pem
            powershell.exe Import-Certificate -FilePath "C:\ca\ca.pem" -CertStoreLocation "Cert:\CurrentUser\Root\\"
            rm -rf /mnt/c/ca
        fi
        ;;
    'Darwin') 
        sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" ~/ca/ca.pem
        ;;
    *) ;;
    esac
    printf "\r\033[1;32m%s\033[0m\n" "Creating certs files"
else
    printf "\r\033[1;32m%s\033[0m\n" "CA files already exists ✅"
fi
if [ ! -f docker/nginx/certs/localhost.crt ] || [ ! -f docker/nginx/certs/localhost.key ]
then
    openssl genrsa -passout pass:$PASS -out docker/nginx/certs/$DOMAIN.key 2048
    openssl req -new -key docker/nginx/certs/$DOMAIN.key -out docker/nginx/certs/$DOMAIN.csr -subj "/C=FR/ST=Paris/L=Paris/O=Natiq/OU=IT/CN=$DOMAIN"
    cat > docker/nginx/certs/$DOMAIN.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $DOMAIN
DNS.2 = admin.$DOMAIN
EOF

    openssl x509 -passin pass:$PASS -req -in docker/nginx/certs/$DOMAIN.csr -CA ~/ca/ca.pem -CAkey ~/ca/ca.key -CAcreateserial -out docker/nginx/certs/$DOMAIN.crt -days 825 -sha256 -extfile docker/nginx/certs/$DOMAIN.ext
    printf "\r\033[1;32m%s\033[0m\n" "Certs files created ✅"
else
    printf "\r\033[1;32m%s\033[0m\n" "Certs files already exists ✅"
fi
yes '' | head -n1
}

############################################################
# CheckDockerStarted                                       #
############################################################
CheckDockerStarted()
{ 
    printf "
    -----------------------------------------------
            Checking if docker is running 
    -----------------------------------------------
    "
    docker info > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        printf '\r\e[31m%s\e[0m\n' "Please start Docker"
        exit 1
    fi
    printf "\r\033[1;32m%s\033[0m\n" "docker is started ✅"
    yes '' | head -n1
}

############################################################
# DockerDown                                               #
############################################################
DockerDown()
{
    printf "
    -----------------------------------------------
            Down every docker container 
    -----------------------------------------------
    "
    docker-compose down
    yes '' | head -n1
}

############################################################
# DockerBuild                                              #
############################################################
DockerBuild()
{
    printf "
    -----------------------------------------------
                Docker build images
    -----------------------------------------------
    "
    docker-compose build
    yes '' | head -n1
}

############################################################
# StartDockerContainers                                    #
############################################################
StartDockerContainers()
{
    printf "
    -----------------------------------------------
               Starting Docker Containers
    -----------------------------------------------
    "
    docker-compose up directusdb nginx -d 
    yes '' | head -n1
}

############################################################
# ImportSnapshot                                           #
############################################################
ImportSnapshot()
{
    printf "
    -----------------------------------------------
                Importing the snapshot
    -----------------------------------------------
    "
    docker-compose run --rm directus npx directus bootstrap
    docker-compose run --rm directus npx directus schema apply --yes //directus//snapshots//snapshot.yaml
    docker-compose up directus -d --wait
    yes '' | head -n1
}


############################################################
# InstallYarnDeps                                          #
############################################################
InstallYarnDeps()
{
    printf "
    -----------------------------------------------
                Installing yarn deps
    -----------------------------------------------
    "
    (cd next && yarn)
    (cd directus/scripts && yarn)
    yes '' | head -n1
}

############################################################
# CallingCodegen                                           #
############################################################
CallingCodegen()
{
    printf "
    -----------------------------------------------
                    Calling Codegen 
    -----------------------------------------------
    "
    (cd next && yarn codegen)
    yes '' | head -n1
}

############################################################
# ImportFlowsAndSettings                                   #
############################################################
ImportFlowsAndSettings()
{
    printf "
    -----------------------------------------------
              Importing Flows and Settings
    -----------------------------------------------
    "
    (cd directus/scripts && yarn run import)
    yes '' | head -n1
}

############################################################
# NextUp                                                   #
############################################################
NextUp()
{
    printf "
    -----------------------------------------------
                        Next up  
    -----------------------------------------------
    "
    (cd next && yarn dev)
}

############################################################
# Help                                                     #
############################################################
Help()
{
    printf "
    -----------------------------------------------
                    Natiq help command           
    -----------------------------------------------
"
printf '\r\e[31m%s\e[0m\n' "Help"
    yes '' | head -n1
    exit 1
}  

############################################################
# Install                                                  #
############################################################
Install()
{
    STOP_STEP=0
    clear
    CheckCommand
    CreateCA
    CheckDockerStarted
    DockerDown
    DockerBuild
    StartDockerContainers
    InstallYarnDeps
    ImportSnapshot
    ImportFlowsAndSettings
    STOP_STEP=1
    CallingCodegen
    NextUp
}

############################################################
# Start                                                    #
############################################################
Start()
{
    clear
    CheckCommand
    CreateCA
    CheckDockerStarted
    StartDockerContainers
    NextUp
}

############################################################
# Stop                                                  #
############################################################
Stop()
{
    clear
    CheckCommand
    DockerDown
}

############################################################
# Codegen                                                  #
############################################################
Codegen()
{
    clear
    CheckCommand
    CallingCodegen
} 

############################################################
# Arg list                                                 #
############################################################
case $1 in
    install)
        Install
	    break
    ;;
    start)
        Start
        break
    ;;
    stop)
        Stop
        break
    ;;
    codegen)
        Codegen
        break
    ;;   
    createCA)
        CreateCA
        break
    ;;
    help)
        Help
        break
    ;;
    *)
        Help
        exit
    ;;
esac