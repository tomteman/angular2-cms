#!/bin/sh

# build app on local machine
cd ~ && cd $POF_CLIENT_PATH && sh build.sh

cd ~
# delete app directory
ssh -i $POF_CLIENT_SSH_FILE_PATH $POF_CLIENT_MACHINE_USER@$POF_CLIENT_MACHINE_LOCATION 'rm -rf ~/bullshit-client/*'

# copy dist to remote machine
scp -r -i $POF_CLIENT_SSH_FILE_PATH $POF_CLIENT_PATH/dist $POF_CLIENT_MACHINE_USER@$POF_CLIENT_MACHINE_LOCATION:~/bullshit-client/dist

# copy run.sh to remote machine
scp -i $POF_CLIENT_SSH_FILE_PATH $POF_CLIENT_PATH/run.sh $POF_CLIENT_MACHINE_USER@$POF_CLIENT_MACHINE_LOCATION:~/bullshit-client/run.sh

# copy Docker file to remote machine
scp -i $POF_CLIENT_SSH_FILE_PATH $POF_CLIENT_PATH/Dockerfile $POF_CLIENT_MACHINE_USER@$POF_CLIENT_MACHINE_LOCATION:~/bullshit-client/Dockerfile

# run Docker on the remote machine
ssh -i $POF_CLIENT_SSH_FILE_PATH $POF_CLIENT_MACHINE_USER@$POF_CLIENT_MACHINE_LOCATION 'cd ~/bullshit-client; sh run.sh'