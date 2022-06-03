import * as path from "path";
import { Command } from "commander/esm.mjs";
import { code2ast, parse } from "./parser.js";

const program = new Command();
program.version("0.0.1", "-v, --vers", "output the current version");

program
  .command("parse_file")
  .option("-f, --file [files...]", "target files")
  .option("-o, --output <path>", "set output dir", ".parse_result")
  .description("parse js files.")
  .action((options) => {
    parse(options.file, path.resolve(options.output)).then(() =>
      process.exit(0)
    );
  });

program
  .command("code_to_ast")
  .argument("<string>", "target code")
  .description("convert code to ast")
  .action((str) => {
    console.log(code2ast(str));
  });

program.parse(process.argv);
