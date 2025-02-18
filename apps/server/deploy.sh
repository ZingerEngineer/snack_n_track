
echo "Pulling changes..." &&
git stash &&
git pull origin main &&
echo "Installing dependencies..." &&
yarn && 
echo "Applying DB changes..." &&
npx prisma generate --schema=./src/prisma/schema.prisma &&
npx prisma migrate deploy &&
echo "Building project artifcats..." &&
yarn build &&
cp .env ./dist/.env &&
echo "Running project..." &&
pm2 restart 0