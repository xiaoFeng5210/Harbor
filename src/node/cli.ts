import { cac } from 'cac';
import { createDevServer } from "./dev";
const path = require('path');

const version = require('../../package.json').version;

const cli = cac('island').version(version).help()

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    root = root ? path.resolve(root) : path.cwd()
    console.log(root)
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  })

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
  })

cli.parse()

