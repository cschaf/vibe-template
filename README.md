# React + Vite + TypeScript + Tailwind Deployment to GitHub Pages with CI/CD

This README provides a step-by-step guide to deploying a React application built with Vite and TypeScript to GitHub Pages. The process includes setting up an automated Continuous Integration/Continuous Deployment (CI/CD) workflow with GitHub Actions to streamline the deployment of future changes.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Step 1: Create React + Vite Project](#step-1-create-react--vite-project)
3.  [Step 2: Configure Vite for GitHub Pages](#step-2-configure-vite-for-github-pages)
4.  [Step 3: Install `gh-pages` package and update `package.json`](#step-3-install-gh-pages-package-and-update-packagejson)
5.  [Step 4: Create GitHub Repository and Push Code](#step-4-create-github-repository-and-push-code)
6.  [Step 5: Set up GitHub Actions Workflow](#step-5-set-up-github-actions-workflow)
7.  [Step 6: Configure GitHub Repository Settings for Pages](#step-6-configure-github-repository-settings-for-pages)
8.  [Step 7: Trigger Deployment and Verify](#step-7-trigger-deployment-and-verify)
9.  [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (recommended: LTS version)
*   [npm](https://www.npmjs.com/get-npm) (installed with Node.js) or [Yarn](https://yarnpkg.com/)/[pnpm](https://pnpm.io/)
*   [Git](https://git-scm.com/downloads)
*   A [GitHub account](https://github.com/)
*   A code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

## Step 1: Create React + Vite Project

1.  **Initialize Vite project:**
    Open your terminal and navigate to the directory where you want to create your project. Then run the following command:
    ```bash
    npm create vite@latest
    ```
    *   **Project name:** Enter a name for your project (e.g., `react-cicd-github`).
    *   **Select a framework:** Choose `React`.
    *   **Select a variant:** Choose `TypeScript`.

2.  **Change to project directory and install dependencies:**
    ```bash
    cd react-cicd-github
    npm install
    ```
3. **Install TailwindCSS:**
    ```bash
    npm install tailwindcss @tailwindcss/vite
    ```

4.  **Adjust `vite.config.ts`:**
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
    plugins: [    tailwindcss(), react()],
    })
    ```

5.  **Import tailwind into `index.css`:**
    ```css
      @import "tailwindcss";
    ```    
    
6.  **Start project locally (optional, for verification):**
    ```bash
    npm run dev
    ```
    Your application should open in your browser at `http://localhost:5173` (or a similar port).

## Step 2: Configure Vite for GitHub Pages

For Vite to correctly reference build assets when hosted in a subdirectory on GitHub Pages, you need to configure the `base` option.

1.  **Edit `vite.config.ts`:**
    Open the `vite.config.ts` file in your project.

2.  **Add `base` option:**
    Add the `base` property to the `defineConfig` function. The value should be the name of your GitHub repository, enclosed in slashes.

    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [tailwindcss(),react()],
      // FOR GITHUB PAGES DEPLOYMENT:
      base: "/YOUR_REPO_NAME/", // ⚠️ IMPORTANT: Replace 'YOUR_REPO_NAME' with the name of your GitHub repository
      server: {
        open: true, // Optional: Opens the app automatically in the browser on `npm run dev`
        port: 3001, // Optional: Sets the local development port
      },
    })
    ```

## Step 3: Install `gh-pages` package and update `package.json`

The `gh-pages` package simplifies deploying your build folder to a `gh-pages` branch on GitHub.

1.  **Install `gh-pages`:**
    ```bash
    npm install gh-pages --save-dev
    ```

2.  **Add deployment script to `package.json`:**
    Open the `package.json` file and add a new `deploy` script command under `scripts`:

    ```json
    {
      "name": "react-cicd-github",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "deploy": "gh-pages -d dist" // Add this line
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      "devDependencies": {
        "@types/react": "^18.2.37",
        "@types/react-dom": "^18.2.15",
        "@typescript-eslint/eslint-plugin": "^6.10.0",
        "@typescript-eslint/parser": "^6.10.0",
        "@vitejs/plugin-react": "^4.2.0",
        "eslint": "^8.53.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.4",
        "gh-pages": "^6.1.0", // This package was installed in step 3.1
        "typescript": "^5.2.2",
        "vite": "^5.0.0"
      }
    }
    ```

## Step 4: Create GitHub Repository and Push Code

1.  **Create an empty GitHub repository:**
    *   Go to [GitHub](https://github.com/).
    *   Click on `New` or `+` -> `New repository`.
    *   Enter the repository name exactly as you used it in `vite.config.ts` for the `base` property (e.g., `react-cicd-github`).
    *   Ensure it is a `Public` repository.
    *   You can add a README, but it's not strictly necessary as we will push our code.
    *   Click on `Create repository`.

2.  **Push code to the GitHub repository:**
    Execute the following commands in your terminal in the root directory of your project:
    ```bash
    git init
    git add .
    git commit -m "Initial project setup"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```
    ⚠️ **IMPORTANT:** Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPO_NAME` with your repository name.

## Step 5: Set up GitHub Actions Workflow

This workflow will be triggered automatically when you push changes to the `main` branch or manually via the GitHub Actions interface.

1.  **Create workflow directory:**
    In the root directory of your project, create the `.github/workflows/` folder:
    ```bash
    mkdir -p .github/workflows
    ```

2.  **Create `deploy.yml` file:**
    In the `.github/workflows/` directory, create a file named `deploy.yml`.

3.  **Add workflow definition:**
    Add the following content to the `deploy.yml` file:

    ```yaml
    name: Deploy React + Vite to Github Pages

    on:
      workflow_dispatch: # Allows manual triggering of the workflow via the GitHub UI
      push: # Triggers the workflow on a push
        branches:
          - main # On the 'main' branch

    jobs:
      build-deploy: # Name of the job
        runs-on: ubuntu-latest # Runner environment for executing the steps

        steps:
          # Step 1: Checkout repository code
          - name: Checkout code
            uses: actions/checkout@v3 # Uses an official GitHub Action to checkout the code

          # Step 2: Set up Node.js environment
          - name: Setup Node.js
            uses: actions/setup-node@v3 # Uses an official GitHub Action to set up Node.js
            with:
              node-version: 18 # Define the Node.js version to be used

          # Step 3: Install project dependencies
          - name: Install Dependencies
            run: npm install # Executes the npm install command

          # Step 4: Build project (production-ready)
          - name: Build the project
            run: npm run build # Executes the "build" script from your package.json

          # Step 5: Deploy to GitHub Pages
          - name: Deploy to github pages
            uses: peaceiris/actions-gh-pages@v3 # GitHub Action specifically for deploying to GitHub Pages
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }} # Uses the automatically generated GitHub token for authentication
              publish_dir: dist # The directory to be published (the build output folder)
              # branch: gh-pages # By default, the gh-pages branch is used, can be specified explicitly
    ```

4.  **Push `deploy.yml`:**
    Save the `deploy.yml` file and push it to your repository:
    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "Added GitHub Actions workflow for deployment"
    git push origin main
    ```

## Step 6: Configure GitHub Repository Settings for Pages

After the workflow has run for the first time (even if it fails), the `gh-pages` branch will be created. We need to set this as the deployment source.

1.  **Set workflow permissions (very important!):**
    The `GITHUB_TOKEN` in the workflow needs write permissions to create and update the `gh-pages` branch.
    *   Go to your GitHub repository.
    *   Click on `Settings` -> `Actions` -> `General`.
    *   Scroll down to `Workflow permissions`.
    *   Select `Read and write permissions`.
    *   Click on `Save`.

2.  **Configure GitHub Pages:**
    *   Go to your GitHub repository.
    *   Click on `Settings` -> `Pages`.
    *   Under `Build and deployment`:
        *   For `Source`, select `Deploy from a branch`.
        *   For `Branch`, select `gh-pages`.
        *   Keep the directory as `/root`.
    *   Click on `Save`.

## Step 7: Trigger Deployment and Verify

1.  **Trigger workflow again:**
    Since we changed the permissions, you need to trigger the workflow once more.
    *   In your GitHub repository, go to the `Actions` tab.
    *   Select the `Deploy React + Vite to Github Pages` workflow.
    *   Click on `Run workflow` in the top right corner and confirm execution. Alternatively, you can make a small change to your code and push it to the `main` branch.

2.  **Check workflow status:**
    *   Stay on the `Actions` tab.
    *   Click on the currently running workflow to see the details.
    *   Verify that all steps complete successfully (green checkmarks). The "Deploy to github pages" step should now be successful.

3.  **Verify deployed application:**
    *   After the workflow is complete, go to `Settings` -> `Pages` again.
    *   You should see a message that your site is live, along with the URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
    *   Click this URL to see your deployed React/Vite application. You may need to do a hard refresh (Ctrl+F5 or Cmd+Shift+R) to see the changes.

## Common Issues and Troubleshooting

*   **404 error after deployment:**
    *   Ensure that the `base` property in `vite.config.ts` is correctly set to the repository name (e.g., `"/YOUR_REPO_NAME/"`).
    *   In the GitHub Pages settings, check if the `gh-pages` branch is selected as the source.
    *   Sometimes it can take a few minutes for GitHub Pages to reflect the changes. Try refreshing the page multiple times (hard refresh).

*   **Workflow errors related to permissions (e.g., "Permission to ... denied"):**
    *   This is the most common error. Go to `Settings` -> `Actions` -> `General` and set `Workflow permissions` to `Read and write permissions`. Save and trigger the workflow again.

*   **Assets (images, CSS, JS) not loading:**
    *   This is usually a problem with the `base` URL. Double-check the value in `vite.config.ts` carefully. It must be the exact repository name, including the slashes at the beginning and end.

---
