![Snack n' Track](https://i.imgur.com/kFDJX7K.jpg)

# Snack n' Track (Overview)

Snack n' Track is an AI-powered mobile application designed to revolutionize health tracking and calorie management. By simply taking a photo of your meal, the app uses advanced food recognition technology to identify food items and provide accurate nutritional information.

This is a monorepo meaning that it contains both backend **( server )** and frontend **( mobile )** of the app.

## Environment Variables

### Root ENV:

**postgres.env**: Contains PostgreSQL credentials.

### Mobile ENV:

**.env**: Contains important api keys.

### Server ENV:

**.env**: Contains connection string and secrets.

_Request environment variables from your teammates or shared group._

## Main Installation

After clonning the repo, You will need to install the dependencies using yarn package manager.

### Check if you have yarn installed:

**`yarn -v`**: Prints out yarn version.

if it's not installed, run the following command:

**`npm install yarn -g`**: Installs yarn globally.

After installing yarn change directory to the root of the monorepo then run:
**`yarn`**.

## 🖥 Server / Backend

Our backend to serve the user.

## 📦 Backend Dependencies & Versions

#### 🖥️ **Core Backend Framework**

- **Express**: `^4.21.1` – Fast and minimalist web framework for Node.js.

#### 🔑 **Authentication & Security**

- **bcrypt**: `^5.1.1` – Password hashing for authentication.
- **jsonwebtoken**: `^9.0.2` – JWT authentication and token handling.
- **cookie-parser**: `^1.4.7` – Middleware for parsing cookies.
- **cors**: `^2.8.5` – Cross-Origin Resource Sharing (CORS) middleware.

#### 🗄️ **Database & ORM**

- **Prisma**: `^5.22.0` – Modern database ORM.
- **@prisma/client**: `^5.22.0` – Prisma client for database interactions.
- **Supabase**: `>=1.8.1` – Backend as a service (BaaS) for database management.
- **@supabase/supabase-js**: `^2.46.1` – Supabase client SDK for interacting with the database.

#### 📂 **File Handling & Parsing**

- **multer**: `^1.4.5-lts.1` – Middleware for handling file uploads.
- **mime-types**: `^2.1.35` – Detecting file types based on extensions.

#### 🌐 **Environment Management**

- **dotenv**: `^16.4.5` – Loads environment variables from a `.env` file.

#### 🤖 **AI & Automation**

- **OpenAI SDK**: `^4.73.0` – Communicates with OpenAI APIs.
- **Puppeteer**: `^24.1.1` – Headless browser automation.
- **puppeteer-extra**: `^3.3.6` – Extends Puppeteer with plugins.
- **puppeteer-extra-plugin-stealth**: `^2.11.2` – Plugin to avoid detection when scraping.

#### 🛠️ **TypeScript & Utilities**

- **tsx**: `^4.19.2` – Fast TypeScript execution.

### 🛠️ Development Dependencies

- **@types/express**: `^5.0.0` – Type definitions for Express.
- **@types/bcrypt**: `^5.0.2` – Type definitions for bcrypt.
- **@types/cors**: `^2.8.17` – Type definitions for CORS.
- **@types/cookie-parser**: `^1.4.8` – Type definitions for cookie-parser.
- **@types/jsonwebtoken**: `^9.0.8` – Type definitions for jsonwebtoken.
- **@types/multer**: `^1.4.12` – Type definitions for multer.
- **@types/mime-types**: `^2.1.4` – Type definitions for mime-types.
- **@types/node**: `^22.9.3` – Type definitions for Node.js.

## Database Installation

DB needs a docker container to be hosted and run.

### Downloading & Installing Docker:

## Windows:

Download docker desktop from: https://docs.docker.com/desktop/setup/install/windows-install/

This will install docker, docker compose and docker engine all together.

## Linux:

See tutorial by docker hub:
https://docs.docker.com/desktop/setup/install/linux/

### Running Docker:

In root directory,
![Root dir](https://i.imgur.com/YEvsVSo.png)

run: **`npm run compose-db-up`**

This creates a docker container by pulling Alpine linux - PostgreSQL v.15 and creates a running container with exposed and mapped port and a volume for the database files.

To reverse this _( Stopping the container without deleting the volume created ),_

run: **`npm run compose-db-down`**

**(WIP)** **`npm run compose-up`**: Will run the whole docker-compose.yml file and make containers for build / production for mobile, server, and DB.

## Exposing 5432 Port on the host machine:

It's essential to expose the port to run and manage the PostgreSQL DB using a GUI client like pgAdmin 4.

## Windows:

1. **Right-click the Start button.**
2. **Click Search.**
3. **Type Windows Firewall.**
4. **Click Windows Firewall.**
5. **Click Advanced settings.**
6. **Click Inbound Rules.**
7. **Click New Rule.**
8. **Select Port and click Next.**
9. **Choose TCP or UDP.**
10. **Specify the Port number.**
11. **Click Next and select Allow the connection.**
12. **Click Next and choose the Network types (Domain, Private, Public).**
13. **Name the Rule and click Finish.**

### To close the port:

1. **Right-click the Start button.**
2. **Click Search.**
3. **Type Windows Firewall.**
4. **Click Windows Firewall.**
5. **Click Advanced settings.**
6. **Click Inbound Rules or Outbound Rules.**
7. **Select the Rule you created.**
8. **Right-click the Rule name.**
9. **Click Disable Rule to deactivate it or Delete to remove it entirely.**

## Linux:

1.  **`sudo ufw status`**: Check firewall status.

2.  ### If it's deactivated or not installed.

        1. sudo apt update

        2. sudo apt upgrade

    Update and upgrade existing packages.

        3. sudo apt install ufw: Install ufw firewall.

3.  **`sudo ufw enable`**: Enable firewall.

4.  **`sudo ufw allow ssh`**: Allow ssh communication.

5.  **`sudo ufw allow 5432`**: Allow / Open port 5432.

6.  **`sudo ufw reload`**: Reloads the firewall for actions to take place.

### To disable / close the ports:

**`sudo ufw delete allow 5432`**: Disable / close port 5432.

## Database Running and Migration

After creating docker container and hosting the db you need to populate the db with migrations.

### Creating migrations using Prisma ORM:

![Prisma ORM](https://i.imgur.com/kPz7Qlt.jpg)
Prisma is an ORM Object relational mapper that maps your programming language classes to sql queries and tables.

See tutorial and guide:
https://www.prisma.io/docs/getting-started/quickstart-sqlite

### Creating & Running migrations:

After making changes to the schema.prisma file and creating new models,

![Schema image](https://i.imgur.com/BlplcZ4.png)

You need to create new migration files for the database to take action and change the hosted database in docker container and accept new data from you correctly.

While standing in server root dir:

![Server root](https://i.imgur.com/NEd0AWl.png)

Run the following command:
**`npx prisma migrate dev --name [name]`**: Enter the name of the migration file and wait for the orm to migrate and let changes take action.

## 🛠️ Backend Run Commands

#### 🚀 Development

- **`npm run dev`** – Runs the development server using `ts-node`.

#### 🏗️ Build & Deployment

- **`npm run build`** – Compiles TypeScript files into JavaScript.
- **`npm run start`** – Starts the compiled application from `dist/index.js`.

#### 🗄️ Database Seeding & Cleanup

- **`npm run userSeed`** – Seeds the database with user data.
- **`npm run clearUsers`** – Removes all users from the database.

## 📱 Mobile App

Our interface & channel for the user.

## 📦 Dependencies & Versions

#### 🚀 **Core Technologies**

- **Vue**: `^3.5.12` - The progressive JavaScript framework.
- **Vue Router**: `^4.4.5` - Official router for Vue.js applications.
- **Pinia**: `^2.2.6` - State management for Vue.

#### 📱 **Ionic & Capacitor**

- **@ionic/vue**: `^8.4.0` - Ionic framework for Vue.
- **@ionic/vue-router**: `^8.4.0` - Router integration for Ionic Vue.
- **@capacitor/core**: `^6.2.0` - Capacitor core functionality.
- **@capacitor/android**: `^6.2.0` - Capacitor Android platform.
- **@capacitor/camera**: `^6.1.1` - Camera API for Capacitor.

#### 🎨 **UI & Styling**

- **FontAwesome (Icons)**:
  - **Core**: `^6.7.2`
  - **Brands**: `^6.7.2`
  - **Regular**: `^6.7.2`
  - **Solid**: `^6.7.2`
  - **Vue Integration**: `^3.0.8`
- **Tailwind CSS**: `^3.4.15` - Utility-first CSS framework.

#### 📡 **Networking & Validation**

- **Axios**: `^1.7.9` - HTTP client for API requests.
- **Vee Validate**: `^4.15.0` - Form validation for Vue.
- **@vee-validate/zod**: `^4.15.0` - Zod integration for Vee Validate.

#### 🔥 **Notifications**

- **vue3-toastify**: `^0.2.8` - Toast notifications for Vue 3.

### 🛠️ Development Dependencies

#### 🏗 **Build Tools & Frameworks**

- **Vite**: `^5.4.10` - Fast frontend build tool.
- **@vitejs/plugin-vue**: `^5.1.4` - Vue plugin for Vite.
- **@vitejs/plugin-vue-jsx**: `^4.0.1` - Vue JSX support in Vite.

#### 📏 **Linting & Formatting**

- **ESLint Vue Plugin**: `^9.30.0`
- **@vue/eslint-config-prettier**: `^10.1.0`
- **@vue/eslint-config-typescript**: `^14.1.3`

#### 🧪 **Testing**

- **Vitest**: `^2.1.4` - Testing framework for Vite.
- **@vue/test-utils**: `^2.4.6` - Vue testing utilities.
- **Cypress**: `^13.15.1` - End-to-end testing framework.
- **eslint-plugin-cypress**: `^4.1.0` - ESLint plugin for Cypress.

#### 🔧 **TypeScript & Configs**

- **Vue TSC**: `^2.1.10` - TypeScript type checking for Vue.
- **@vue/tsconfig**: `^0.5.1` - TypeScript configuration for Vue projects.
- **@tsconfig/node22**: `^22.0.0` - TypeScript config for Node.js 22.
- **@types/node**: `^22.9.0` - Node.js type definitions.
- **@types/jsdom**: `^21.1.7` - JSDOM type definitions.

#### 🚀 **Other Tools**

- **JSDOM**: `^25.0.1` - JavaScript implementation of DOM and HTML.
- **PostCSS**: `^8.4.49` - CSS processing tool.
- **Autoprefixer**: `^10.4.20` - Adds vendor prefixes to CSS.
- **npm-run-all2**: `^7.0.1` - Runs multiple npm scripts concurrently.
- **Start Server and Test**: `^2.0.8` - Utility for starting a server and running tests.
- **vite-plugin-vue-devtools**: `^7.5.4` - DevTools plugin for Vue 3.

## 🚀 Mobile app commands

#### 🚀 Development

- **`npm run dev`** – Starts the development server using Vite.

#### 🏗️ Build

- **`npm run build`** – Runs type checking and builds the app.
- **`npm run build-only`** – Builds the app without type checking.

#### 👀 Preview

- **`npm run preview`** – Serves the built app locally for preview.

#### 🧪 Testing

- **`npm run test:unit`** – Runs unit tests using Vitest.
- **`npm run test:e2e`** – Runs end-to-end tests with Cypress, ensuring the preview server is running.
- **`npm run test:e2e:dev`** – Starts the dev server and opens Cypress for E2E testing.

#### 🔍 Code Quality

- **`npm run type-check`** – Performs TypeScript type checking.
- **`npm run lint`** – Runs ESLint and fixes issues automatically.
- **`npm run format`** – Formats the `src/` directory using Prettier.
