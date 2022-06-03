import * as esprima from "esprima";
import * as path from "path";
import * as fse from "fs-extra";
import { readFile } from "fs/promises";

/**
 * @param {string} file
 * @param {string} output
 * @returns {Promise<string>}
 */
function from_file(file, output) {
  return readFile(file)
    .then((buffer) => code2ast(buffer.toString()))
    .then((ast) =>
      fse.outputFile(path.join(output, `${path.parse(file).name}.json`), ast)
    )
    .catch((error) => {
      console.error(error.message);
    });
}

/**
 * @param {string} code
 * @returns {string}
 */
export const code2ast = (code) => JSON.stringify(esprima.parse(code), null, 2);

/**
 * @param {Array<string>} files
 * @param {string} output
 * @returns {Promise<Array<string>>}
 */
export const parse = (files, output) =>
  Promise.all(files.map((file) => from_file(file, output)));
