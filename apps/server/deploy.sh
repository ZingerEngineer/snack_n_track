
echo "Pulling changes..." &&
cd ~/snack_n_track &&
git stash &&
git pull origin main &&
echo "Installing dependencies..." &&
yarn && 
cd apps/server &&
echo "Applying DB changes..." &&
npx prisma generate --schema="./src/prisma/schema.prisma" &&
npx prisma migrate deploy --schema="./src/prisma/schema.prisma"  &&
echo "Building project artifcats..." &&
yarn build &&
cp .env ./dist/.env &&
echo "Running project..." &&
pm2 restart 0 &&
echo "Deployment complete!"
