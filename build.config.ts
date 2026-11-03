import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    // Движок подстановки и бланка отдельным входом `@coopenomics/docs-factory/templator`.
    // Корень пакета тянет pg, kysely и node:*, поэтому браузерной сборке не годится;
    // реестр стандартов (mono, standards-site) печатает бланки этим же движком,
    // чтобы бланк на сайте совпадал с бланком для совета. Вход держит только
    // nunjucks и типы — серверный код в этот вход не подключать.
    { input: 'src/Services/Templator/index', name: 'templator' },
    // {
    //   input: 'src/Templates/index',
    //   outDir: 'dist',
    //   name: 'Templates',
    // },
  ],
  declaration: true,
  clean: false,
  rollup: {
    emitCJS: true,
  },
})
