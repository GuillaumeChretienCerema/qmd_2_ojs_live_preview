// convert.js
const fs = require('fs');

// Récupérer le nom du fichier depuis les arguments
const filename = process.argv[2]; // Premier argument passé au script
if (!filename) {
  console.error("Veuillez fournir un nom de fichier .qmd en argument.");
  process.exit(1);
}

// Lire le fichier .qmd
const qmdContent = fs.readFileSync(filename, 'utf8');

// Extraire le titre
const titleMatch = qmdContent.match(/title:\s*"([^"]+)"/);
const title = titleMatch ? titleMatch[1] : "Temporaire pour visualisation";

// Extraire les blocs {ojs}
const ojsBlocks = qmdContent.match(/```\{ojs\}\s*([\s\S]*?)\s*```/g);

// Générer le contenu HTML
let htmlContent = `<!doctype html>
<notebook theme="air">
  <title>${title}</title>
  <script id="0" type="text/markdown">
    # ${title}
  </script>`;

// Ajouter chaque bloc {ojs} comme un script Observable
ojsBlocks.forEach((block, index) => {
  const code = block.replace(/```\{ojs\}\s*|\s*```/g, '').trim();
  const pinned = index === 0 ? ' pinned=""' : '';
  htmlContent += `
  <script id="${index + 1}" type="application/vnd.observable.javascript"${pinned}>
    ${code}
  </script>`;
});

htmlContent += `
</notebook>`;

// Écrire le fichier HTML
const outputFilename = filename.replace('.qmd', '.observable.html');
fs.writeFileSync(outputFilename, htmlContent);

console.log(`Fichier HTML généré avec succès : ${outputFilename}`);