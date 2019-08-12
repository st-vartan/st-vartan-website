Source code for [St.Vartan Basketball Website](st-vartan.github.io)

## Table of Contents
- [Development](#development)
- [Architecture](#architecture)
- [Data Visualization](#data-visualization)
- [License](#license)

## Development
> Make sure `node`, `npm`, `git` are installed on your system.
### Clone

`git clone https://github.com/st-vartan/st-vartan-website.git st-vartan-website`
### In project's root folder

`npm install`
### Start dev server

`npm run dev`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any errors in the console.

### Build & Deploy

`npm run build`

`npm run export`

Builds the app for production and then export static site files to `out` folder.
Put the generated files to `https://github.com/st-vartan/st-vartan.github.io` and website will be up to date

### Start in production mode
`npm run start`
Starts the application in production mode. The application should be compiled with `next build` first.

### <em>Optional</em> Deploy to `now`
Install the `now` command-line tool either via the recommended [desktop tool](https://zeit.co/download) or via node with `npm install -g now`.

Run `now` from your project directory. You will see a **now.sh** URL in your output like this:

    ```
    > Ready! https://your-project-dirname-tpspyhtdtk.now.sh (copied to clipboard)
    ```

    Paste that URL into your browser when the build is complete, and you will see your deployed app.

## Architecture
The following technical decisions are made in design phrase:
- Static Site vs. Application. This site contains data visualizations, which will make this site scale up to a more complicated
application. In this case, the method in which we compose components becomes important. Therefore this site is a react
application but not a static html site
- SPA(Single Page Application) vs. SSR(Server Side Rendering) SEO is critical for this site, therefore SSR is adopted.
- Serverless. Site is hosted on github.io, an serverless environment. However, if any requirements of a server backend arise in future, `GraphQL` and `Amazon AWS`
will be used. This site will stay on `Github.io`, fetching data from `Amazon AWS`

## Data Visualization
Data Visualizations are achieved with `D3`, `WebGL` and `RxJS`;

## License
MIT