// 期望 hola serve --modules="1,2,3" --open
// 期望 hola build --modules="1,2,3" --open
// --open    服务器启动时打开浏览器
// --copy    将URL复制到服务器启动时的剪贴板 (直接到浏览器去粘贴就OK了 http://localhost:8080/)
// --mode    指定环境模式 (默认: development)
// --host    host 地址 (default: 0.0.0.0)
// --port    端口号 (default: 8080)
// --https   使用https (default: false)

const rawArgv = process.argv.slice(2); // [ '/Users/keno/.nvm/versions/node/v10.13.0/bin/node', '/Users/keno/Documents/c-code/daikuanheika-active/node_modules/.bin/vue-cli-service', 'serve', '--module=fcfqld' ]
console.log('rawArgv', rawArgv); // [ 'serve', '--module=fcfqld', '--open' ]

const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
});

// { _: [ 'serve' ],
//   modern: false,
//   report: false,
//   'report-json': false,
//   watch: false,
//   open: true,
//   copy: false,
//   https: false,
//   verbose: false,
//   module: 'fcfqld' }

const command = args._[0]; // 'serve'

const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

service.run(command, args, rawArgv);

class Service {
  private initialized: boolean; // 是否初始化
  private mode: string; // 模式 build | development
  private context: string; // 当前运行环境
  private pkgContext: string; // 当前运行环境
  private webpackChainFns: []; //
  private webpackRawConfigFns: []; //
  private devServerConfigFns: []; //
  private commands: {}; //

  constructor(context, { plugins, pkg, inlineOptions, useBuiltIn } = {}) {
    this.initialized = false;
    this.context = context;
    this.webpackChainFns = [];
    this.webpackRawConfigFns = [];
    this.devServerConfigFns = [];
    this.commands = {};
    this.pkgContext = context;
    // 获取package.json中的依赖
    this.pkg = this.resolvePkg(pkg);
    // process.HOLA_CLI_MODE = this;

    // 解析每个命令使用的默认模式
    //{ serve: 'development',
    // build: 'production',
    // inspect: 'development' }
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes } }) => {
      return Object.assign(modes, defaultModes);
    }, {});
  }

  // 初始化，默认为HOLA_CLI_MODE
  init(mode = process.env.HOLA_CLI_MODE) {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.mode = mode;
    if (mode) {
      this.loadEnv(mode);
    }
  }

  async run(commandName, args = {}, rawArgv = []) {
    const mode = commandName === 'serve' ? 'development' : 'production';

    const serve = require('./service');

    // load env variables, load user config, apply plugins
    // 加载环境变量，加载用户配置，应用插件
    this.init(mode);

    if (mode === 'development') {
      serve(args);
    }
  }
}
