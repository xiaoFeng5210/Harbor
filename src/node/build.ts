import { build as viteBuild } from "vite"
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";

export async function bundle(root: string) {
  try {
    const clientBuild = async () => {
      return viteBuild({
         mode: 'production',
         root,
         build: {
          outDir: 'build',
          rollupOptions: {
            input: CLIENT_ENTRY_PATH,
            output: {
              format: 'esm',
            }
          }
         }
      })
    }
    const serverBuild = async () => {
      return viteBuild({
        mode: 'production',
        root,
        build: {
          ssr: true,
          outDir: '.temp',
          rollupOptions: {
            input: SERVER_ENTRY_PATH,
            output: {
              format: "cjs"
            }
          },
        }
      })
    }
    console.log('Build client + server bundles...')
    await clientBuild();
    await serverBuild();
  } catch (e) {
    console.error(e);
  }
}

export async function build(root: string) {
  // 1 bundle client and server
  await bundle(root);
  // 2 引入server-entry
  // 3 服务端渲染 产出html
}
