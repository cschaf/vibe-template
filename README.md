# React + Vite + TypeScript + Tailwind Bereitstellung auf GitHub Pages mit CI/CD

Dieses README bietet eine Schritt-für-Schritt-Anleitung, um eine React-Anwendung, die mit Vite und TypeScript erstellt wurde, auf GitHub Pages bereitzustellen. Der Prozess beinhaltet die Einrichtung eines automatisierten Continuous Integration/Continuous Deployment (CI/CD)-Workflows mit GitHub Actions, um die Bereitstellung zukünftiger Änderungen zu rationalisieren.

## Inhaltsverzeichnis

1.  [Voraussetzungen](#voraussetzungen)
2.  [Schritt 1: React + Vite Projekt erstellen](#schritt-1-react--vite-projekt-erstellen)
3.  [Schritt 2: Vite für GitHub Pages konfigurieren](#schritt-2-vite-für-github-pages-konfigurieren)
4.  [Schritt 3: `gh-pages` Paket installieren und `package.json` aktualisieren](#schritt-3-gh-pages-paket-installieren-und-packagejson-aktualisieren)
5.  [Schritt 4: GitHub Repository erstellen und Code pushen](#schritt-4-github-repository-erstellen-und-code-pushen)
6.  [Schritt 5: GitHub Actions Workflow einrichten](#schritt-5-github-actions-workflow-einrichten)
7.  [Schritt 6: GitHub Repository-Einstellungen für Pages konfigurieren](#schritt-6-github-repository-einstellungen-für-pages-konfigurieren)
8.  [Schritt 7: Bereitstellung auslösen und überprüfen](#schritt-7-bereitstellung-auslösen-und-überprüfen)
9.  [Häufige Probleme und Fehlerbehebung](#häufige-probleme-und-fehlerbehebung)

---

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass du Folgendes installiert hast:

*   [Node.js](https://nodejs.org/) (empfohlen: LTS-Version)
*   [npm](https://www.npmjs.com/get-npm) (wird mit Node.js installiert) oder [Yarn](https://yarnpkg.com/)/[pnpm](https://pnpm.io/)
*   [Git](https://git-scm.com/downloads)
*   Ein [GitHub-Konto](https://github.com/)
*   Ein Code-Editor (z.B. [Visual Studio Code](https://code.visualstudio.com/))

## Schritt 1: React + Vite Projekt erstellen

1.  **Vite-Projekt initialisieren:**
    Öffne dein Terminal und navigiere zu dem Verzeichnis, in dem du dein Projekt erstellen möchtest. Führe dann den folgenden Befehl aus:
    ```bash
    npm create vite@latest
    ```
    *   **Project name:** Gib einen Namen für dein Projekt ein (z.B. `react-cicd-github`).
    *   **Select a framework:** Wähle `React`.
    *   **Select a variant:** Wähle `TypeScript`.

2.  **Projektverzeichnis wechseln und Abhängigkeiten installieren:**
    ```bash
    cd react-cicd-github
    npm install
    ```
3. **TailwindCSS installieren:**
    ```bash
    npm install tailwindcss @tailwindcss/vite
    ```

4.  **vite.config.ts anpassen:**
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
    plugins: [    tailwindcss(), react()],
    })
    ```

5.  **tailwind in inde.css importieren:**
    ```css
      @import "tailwindcss";
    ```    
    
6.  **Projekt lokal starten (optional, zur Überprüfung):**
    ```bash
    npm run dev
    ```
    Deine Anwendung sollte in deinem Browser unter `http://localhost:5173` (oder einem ähnlichen Port) geöffnet werden.

## Schritt 2: Vite für GitHub Pages konfigurieren

Damit Vite die Build-Assets korrekt referenziert, wenn sie in einem Unterverzeichnis auf GitHub Pages gehostet werden, musst du die `base`-Option konfigurieren.

1.  **`vite.config.ts` bearbeiten:**
    Öffne die Datei `vite.config.ts` in deinem Projekt.

2.  **`base`-Option hinzufügen:**
    Füge die `base`-Eigenschaft zur `defineConfig`-Funktion hinzu. Der Wert sollte der Name deines GitHub-Repositorys sein, eingeschlossen in Schrägstriche.

    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [tailwindcss(),react()],
      // FÜR GITHUB PAGES BEREITSTELLUNG:
      base: "/DEIN_REPO_NAME/", // ⚠️ WICHTIG: Ersetze 'DEIN_REPO_NAME' durch den Namen deines GitHub-Repositorys
      server: {
        open: true, // Optional: Öffnet die App automatisch im Browser bei `npm run dev`
        port: 3001, // Optional: Setzt den lokalen Entwicklungsport
      },
    })
    ```

## Schritt 3: `gh-pages` Paket installieren und `package.json` aktualisieren

Das `gh-pages`-Paket vereinfacht die Bereitstellung deines Build-Ordners in einem `gh-pages`-Branch auf GitHub.

1.  **`gh-pages` installieren:**
    ```bash
    npm install gh-pages --save-dev
    ```

2.  **Bereitstellungs-Skript in `package.json` hinzufügen:**
    Öffne die Datei `package.json` und füge einen neuen `deploy`-Skriptbefehl unter `scripts` hinzu:

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
        "deploy": "gh-pages -d dist" // Füge diese Zeile hinzu
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
        "gh-pages": "^6.1.0", // Dieses Paket wurde in Schritt 3.1 installiert
        "typescript": "^5.2.2",
        "vite": "^5.0.0"
      }
    }
    ```

## Schritt 4: GitHub Repository erstellen und Code pushen

1.  **Leeres GitHub Repository erstellen:**
    *   Gehe zu [GitHub](https://github.com/).
    *   Klicke auf `New` oder `+` -> `New repository`.
    *   Gib den Repository-Namen genau so ein, wie du ihn in `vite.config.ts` für die `base`-Eigenschaft verwendet hast (z.B. `react-cicd-github`).
    *   Stelle sicher, dass es ein `Public` Repository ist.
    *   Du kannst ein README hinzufügen, aber es ist nicht zwingend erforderlich, da wir unseren Code pushen werden.
    *   Klicke auf `Create repository`.

2.  **Code in das GitHub Repository pushen:**
    Führe die folgenden Befehle in deinem Terminal im Stammverzeichnis deines Projekts aus:
    ```bash
    git init
    git add .
    git commit -m "Initial project setup"
    git branch -M main
    git remote add origin https://github.com/DEIN_USERNAME/DEIN_REPO_NAME.git
    git push -u origin main
    ```
    ⚠️ **WICHTIG:** Ersetze `DEIN_USERNAME` durch deinen GitHub-Benutzernamen und `DEIN_REPO_NAME` durch den Namen deines Repositorys.

## Schritt 5: GitHub Actions Workflow einrichten

Dieser Workflow wird automatisch ausgelöst, wenn du Änderungen in den `main`-Branch pushst oder manuell über die GitHub Actions-Oberfläche.

1.  **Workflow-Verzeichnis erstellen:**
    Erstelle im Stammverzeichnis deines Projekts den Ordner `.github/workflows/`:
    ```bash
    mkdir -p .github/workflows
    ```

2.  **`deploy.yml` Datei erstellen:**
    Erstelle im Verzeichnis `.github/workflows/` eine Datei namens `deploy.yml`.

3.  **Workflow-Definition hinzufügen:**
    Füge den folgenden Inhalt in die Datei `deploy.yml` ein:

    ```yaml
    name: Deploy React + Vite to Github Pages

    on:
      workflow_dispatch: # Ermöglicht das manuelle Auslösen des Workflows über die GitHub UI
      push: # Löst den Workflow bei einem Push aus
        branches:
          - main # Auf dem 'main'-Branch

    jobs:
      build-deploy: # Name des Jobs
        runs-on: ubuntu-latest # Runner-Umgebung für die Ausführung der Schritte

        steps:
          # Schritt 1: Repository-Code auschecken
          - name: Checkout code
            uses: actions/checkout@v3 # Verwendet eine offizielle GitHub Action zum Auschecken des Codes

          # Schritt 2: Node.js-Umgebung einrichten
          - name: Setup Node.js
            uses: actions/setup-node@v3 # Verwendet eine offizielle GitHub Action zum Einrichten von Node.js
            with:
              node-version: 18 # Definiere die Node.js-Version, die verwendet werden soll

          # Schritt 3: Projektabhängigkeiten installieren
          - name: Install Dependencies
            run: npm install # Führt den npm-Installationsbefehl aus

          # Schritt 4: Projekt bauen (produktionsbereit)
          - name: Build the project
            run: npm run build # Führt das "build"-Skript aus deiner package.json aus

          # Schritt 5: Auf GitHub Pages bereitstellen
          - name: Deploy to github pages
            uses: peaceiris/actions-gh-pages@v3 # GitHub Action speziell für die Bereitstellung auf GitHub Pages
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }} # Verwendet den automatisch generierten GitHub-Token zur Authentifizierung
              publish_dir: dist # Das Verzeichnis, das veröffentlicht werden soll (der Build-Output-Ordner)
              # branch: gh-pages # Standardmäßig wird der gh-pages Branch verwendet, kann explizit angegeben werden
    ```

4.  **`deploy.yml` pushen:**
    Speichere die Datei `deploy.yml` und pushe sie in dein Repository:
    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "Added GitHub Actions workflow for deployment"
    git push origin main
    ```

## Schritt 6: GitHub Repository-Einstellungen für Pages konfigurieren

Nachdem der Workflow zum ersten Mal ausgeführt wurde (auch wenn er fehlschlägt), wird der `gh-pages`-Branch erstellt. Diesen müssen wir als Bereitstellungsquelle festlegen.

1.  **Workflow-Berechtigungen einstellen (sehr wichtig!):**
    Der `GITHUB_TOKEN` im Workflow benötigt Schreibrechte, um den `gh-pages`-Branch zu erstellen und zu aktualisieren.
    *   Gehe zu deinem GitHub-Repository.
    *   Klicke auf `Settings` (Einstellungen) -> `Actions` -> `General` (Aktionen -> Allgemein).
    *   Scrolle nach unten zu `Workflow permissions` (Workflow-Berechtigungen).
    *   Wähle `Read and write permissions` (Lese- und Schreibberechtigungen) aus.
    *   Klicke auf `Save` (Speichern).

2.  **GitHub Pages konfigurieren:**
    *   Gehe zu deinem GitHub-Repository.
    *   Klicke auf `Settings` (Einstellungen) -> `Pages` (Seiten).
    *   Unter `Build and deployment` (Erstellen und Bereitstellen):
        *   Für `Source` (Quelle), wähle `Deploy from a branch` (Von einem Branch bereitstellen).
        *   Für `Branch` (Branch), wähle `gh-pages`.
        *   Behalte das Verzeichnis als `/root` (Stammverzeichnis) bei.
    *   Klicke auf `Save` (Speichern).

## Schritt 7: Bereitstellung auslösen und überprüfen

1.  **Workflow erneut auslösen:**
    Da wir die Berechtigungen geändert haben, musst du den Workflow einmalig erneut auslösen.
    *   Gehe in deinem GitHub-Repository zum Tab `Actions` (Aktionen).
    *   Wähle den Workflow `Deploy React + Vite to Github Pages` aus.
    *   Klicke auf `Run workflow` (Workflow ausführen) in der oberen rechten Ecke und bestätige die Ausführung. Alternativ kannst du auch eine kleine Änderung an deinem Code vornehmen und sie in den `main`-Branch pushen.

2.  **Workflow-Status überprüfen:**
    *   Bleibe auf dem Tab `Actions` (Aktionen).
    *   Klicke auf den aktuell laufenden Workflow, um die Details zu sehen.
    *   Überprüfe, ob alle Schritte erfolgreich durchlaufen (grüne Häkchen). Der Schritt "Deploy to github pages" sollte nun erfolgreich sein.

3.  **Bereitgestellte Anwendung überprüfen:**
    *   Nachdem der Workflow abgeschlossen ist, gehe erneut zu `Settings` (Einstellungen) -> `Pages` (Seiten).
    *   Du solltest eine Nachricht sehen, dass deine Seite live ist, zusammen mit der URL: `https://DEIN_USERNAME.github.io/DEIN_REPO_NAME/`.
    *   Klicke auf diese URL, um deine bereitgestellte React/Vite-Anwendung zu sehen. Möglicherweise musst du einen Hard-Refresh durchführen (Strg+F5 oder Cmd+Shift+R), um die Änderungen anzuzeigen.

## Häufige Probleme und Fehlerbehebung

*   **404-Fehler nach der Bereitstellung:**
    *   Stelle sicher, dass die `base`-Eigenschaft in `vite.config.ts` korrekt auf den Repository-Namen gesetzt ist (z.B. `"/DEIN_REPO_NAME/"`).
    *   Überprüfe in den GitHub Pages-Einstellungen, ob der `gh-pages`-Branch als Quelle ausgewählt ist.
    *   Manchmal kann es ein paar Minuten dauern, bis GitHub Pages die Änderungen anzeigt. Versuche, die Seite mehrmals zu aktualisieren (Hard Refresh).

*   **Workflow-Fehler bei Berechtigungen (z.B. "Permission to ... denied"):**
    *   Dies ist der häufigste Fehler. Gehe zu `Settings` (Einstellungen) -> `Actions` -> `General` (Aktionen -> Allgemein) und setze die `Workflow permissions` (Workflow-Berechtigungen) auf `Read and write permissions` (Lese- und Schreibberechtigungen). Speichern und den Workflow erneut auslösen.

*   **Assets (Bilder, CSS, JS) werden nicht geladen:**
    *   Dies ist meistens ein Problem mit der `base`-URL. Überprüfe den Wert in `vite.config.ts` noch einmal genau. Es muss der genaue Repository-Name sein, inklusive der Schrägstriche am Anfang und Ende.

---

