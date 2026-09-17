const fs = require("fs");
const { minify: minifyHTML } = require("html-minifier-terser");
const { minify: minifyJS } = require("terser");
const { minify: minifyCSS } = require("clean-css");

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

  const minCSS = minifyCSS(css).styles;

  const minJS = await minifyJS(js, {
    compress: true,
    mangle: true,
    format: {
      comments: false
    }
  });

  fs.writeFileSync("index.min.html", minHTML);
  fs.writeFileSync("style.min.css", minCSS);
  fs.writeFileSync("script.min.js", minJS.code);

  console.log("Production files created successfully.");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
