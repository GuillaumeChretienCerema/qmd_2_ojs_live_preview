# qmd_2_ojs_live_preview

Experimental workflow to hotreload pure ojs1 (meaning no R and no ojs2 and one declaration by chunck) from .qmd page.

> A specific usecase of hotreloading ojs cell of a qmd with observable [notebook-kit](https://observablehq.com/notebook-kit/kit). Specific because : No mix of R and ojs (only ojs chunck) and stricly respect the observable V1 way (like on their platform <https://observablehq.com/>).
> Why : because ojs + quarto is an awesome workflow but I need a fast ojs chunk preview and separate it from a nice quarto render (and avoid to first type all another tool aka observable platform or new html file format)

## Prerequisites

-   Node.js installed (and your fav environnement R, Rstudio, SVC, positron...).

## Steps

1.  Create a Quarto project (R studio interface or `quarto create-project my-project --type website cd my-project`)

2.  Initialize Node.js project : `npm init -y`

3.  Install Observable Notebook Kit : `npm add @observablehq/notebook-kit` and in package-lock.json add "docs:preview": "notebooks preview --root ./" in script properties

```json
{
  "name": "test_quarto_to_ojs2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "docs:preview": "notebooks preview --root ./",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@observablehq/notebook-kit": "^1.5.1"
  }
}
```

4.  **Strictly** follow OJS 1 syntax:

    -   One variable per \`{ojs}\` chunk (e.g., \`x = 1 + 2\`).
    -   No multiple declarations in a single chunk.

5.  Use two terminals:

    -   **Terminal 1**: Preview Quarto project: `npm run docs:preview` and open the URL in your browser (by default localhost:5173).

    -   **Terminal 2**: Convert \`.qmd\` to Observable HTML: `node convert.js my-file.qmd`

    -   Output will be : `my-file.observable.html` so you can just browse url/my-file.observable.html, for exemple http://localhost:5173/index.observable.html.

    -   Each time you save your document and run `node convert.js my-file.qmd` in the second terminal it will hotreload your .observable.html. It works with multiple page opened.

6.  When your ojs chuncks are finished...

    -   Just render or preview your quarto documents as usual and make some adjustments (fontsize)

**And to be even faster and have only one terminal :**

-   type once in the console (not the terminal) `rstudioapi::documentSave();system("node convert.js myfile.qmd")`  

-   then just `ctrl+&` to focus on console,  `↑` to call back our command line `Enter` to execute, `ctrl+é` to come back to edit file

*...to keep it local :*

-   gitignore node_modules directory, *.observable.html files and converts.js file


*Again : this is experimental and for a limited use case*