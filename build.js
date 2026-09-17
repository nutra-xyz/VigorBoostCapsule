const fs = require("fs");
const { minify: minifyHTML } = require("html-minifier-terser");
const { minify: minifyJS } = require("terser");
const CleanCSS = require("clean-css");
async function build() {
  const html = fs.readFileSync("index.html", "utf8");
  const css = fs.readFileSync("style.css", "utf8");
  const js = fs.readFileSync("script.js", "utf8");

  const minHTML = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    minifyCSS: true,
    minifyJS: true
  });

  const minCSS = new CleanCSS().minify(css).styles;

  const minJS = await minifyJS(js, {
    compress: true,
    mangle: true,
    format: {
      comments: false
    }
  });

  fs.writeFileSync("index.html", minHTML);
  fs.writeFileSync("style.css", minCSS);
  fs.writeFileSync("script.js", minJS.code);

  console.log("Vigor Boost production build completed.");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
