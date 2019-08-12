This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide at [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md). And check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info.

## Table of Contents
- [Development](#development)
- [Folder Structure](#folder-structure)

## Development
> Make sure `node`, `npm`, `git` are installed on your system.
1. Clone

`git clone https://github.com/st-vartan/st-vartan-website.git st-vartan-website`
2. In project's root folder

`npm install`
3. Start dev server

`npm run dev`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any errors in the console.

4. Build & Deploy

`npm run build`

`npm run export`

Builds the app for production and then export static site files to `out` folder.

5. Start in production mode
`npm run start`
Starts the application in production mode. The application should be compiled with `next build` first.

6. <em>Optional</em> Deploy to `now`
Install the `now` command-line tool either via the recommended [desktop tool](https://zeit.co/download) or via node with `npm install -g now`.

Run `now` from your project directory. You will see a **now.sh** URL in your output like this:

    ```
    > Ready! https://your-project-dirname-tpspyhtdtk.now.sh (copied to clipboard)
    ```

    Paste that URL into your browser when the build is complete, and you will see your deployed app.

## Folder Structure
```
st-vartan-website/
  README.md
  package.json
  next.config.js
  components/
    head.js
    nav.js
  pages/
    index.js
  static/
    favicon.ico
```

Routing is based on the file system, so `./pages/index.js` maps to the `/` route and
`./pages/about.js` would map to `/about`.

The `./static` directory maps to `/static` in the server, so you can put all your
other static resources like images or compiled CSS in there.

