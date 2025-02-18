echo "Connecting to EC2 instance..." &&

ssh root@MachineB 'bash -s' < local_script.sh
ssh -i "~/ssh/snack_n_track_web_server_key.pem" ubuntu@13.48.138.37 'bash -s' < deploy.sh
# cd ~/snack-n-track &&
# echo "Pulling changes..." &&
# git stash &&
# git pull origin main &&
# echo "Installing dependencies..." &&
# yarn && 
# echo "Applying DB changes..." &&
# npx prisma generate --schema=./src/prisma/schema.prisma &&
# npx prisma migrate deploy --schema=./src/prisma/schema.prisma  &&
# echo "Building project artifcats..." &&
# yarn build &&
# cp .env ./dist/.env &&
# echo "Running project..." &&
# pm2 restart 0 &&
# exit &&