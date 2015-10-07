#!/bin/sh

# build app on local machine
cd ~ && cd $BS_CLIENT_PATH && sh build.sh

cd ~
# delete app directory
ssh -i $BS_CLIENT_SSH_FILE_PATH $BS_CLIENT_MACHINE_USER@$BS_CLIENT_MACHINE_LOCATION 'rm -rf ~/bullshit-client/*'

# copy dist to remote machine
scp -r -i $BS_CLIENT_SSH_FILE_PATH $BS_CLIENT_PATH/dist $BS_CLIENT_MACHINE_USER@$BS_CLIENT_MACHINE_LOCATION:~/bullshit-client/dist

# copy run.sh to remote machine
scp -i $BS_CLIENT_SSH_FILE_PATH $BS_CLIENT_PATH/run.sh $BS_CLIENT_MACHINE_USER@$BS_CLIENT_MACHINE_LOCATION:~/bullshit-client/run.sh

# copy Docker file to remote machine
scp -i $BS_CLIENT_SSH_FILE_PATH $BS_CLIENT_PATH/Dockerfile $BS_CLIENT_MACHINE_USER@$BS_CLIENT_MACHINE_LOCATION:~/bullshit-client/Dockerfile

# run Docker on the remote machine
ssh -i $BS_CLIENT_SSH_FILE_PATH $BS_CLIENT_MACHINE_USER@$BS_CLIENT_MACHINE_LOCATION 'cd ~/bullshit-client; sh run.sh'