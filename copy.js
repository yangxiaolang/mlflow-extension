const fsPromises = require('fs/promises');
const fs = require('fs');

const src = 'src';
const lib = 'lib';

/**
 * @param {string} filePath
 */
function mkdir(filePath) {
  const pathSnippets = filePath.split('/');
  pathSnippets.slice(0, pathSnippets.length-1).reduce((prev, cur) => {
    const path = `${prev}/${cur}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return path;
  }, '.');
}

/**
 * @param {string} dirname 
 */
async function copyAssetsInDir(dirname) {
  const fileList = await fsPromises.readdir(dirname);
  fileList
    .map((filename) => `${dirname}/${filename}`)
    .filter(
      (filePath) =>
        /\.(css|png|svg)$/.test(filePath) || fs.statSync(filePath).isDirectory()
    )
    .forEach(async (filePath) => {
      const fileStat = await fsPromises.stat(filePath);
      if (fileStat.isDirectory()) {
        await copyAssetsInDir(filePath);
      } else {
        const target = filePath.replace(/^src/, lib);
        mkdir(target);
        if(/svg$/.test(target)){
          const svgContent = await fsPromises.readFile(filePath,{encoding:'base64'})
          await fsPromises.writeFile(target,`data:image/svg+xml;base64,${svgContent}`)
        }else{
          await fsPromises.copyFile(filePath, target);
        }

      }
    });
}

copyAssetsInDir(src);
