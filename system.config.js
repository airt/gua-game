System.config({
  transpiler: 'ts',
  typescriptOptions: {
    module: 'system',
    tsconfig: true,
  },
  paths: {
    'npm:': 'https://unpkg.com/',
  },
  map: {
    app: 'app',
    ts: 'npm:plugin-typescript',
    typescript: 'npm:typescript',
  },
  packages: {
    app: {
      defaultExtension: 'ts',
    },
    ts: {
      main: 'lib/plugin.js',
    },
    typescript: {
      main: 'lib/typescript.js',
      meta: {
        'lib/typescript.js': {
          exports: 'ts',
        },
      },
    },
  },
})
