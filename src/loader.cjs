const searchAndReplaceRules = (key, value) => [
  {
    regexp: new RegExp(`^\\s*import\\s+(.+?)\\s+from\\s+['"]${key}.+$`, 'mg'),
  },
  {
    regexp: new RegExp(`^\\s*const\\s+(.+?)\\s+=\\s+require\\(\\s+['"]${key}.+$`, 'mg'),
  },
  {
    regexp: new RegExp(`import\\(['"]${key}['"]\\)`, 'g'),
    string: `import(/* webpackIgnore: true */'${value}')`,
  },
];

function ImportMapsLoader(source) {
  const options = this.getOptions();
  return Object.entries(options.imports)
    .reduce((src, entry) => searchAndReplaceRules(...entry)
      .reduce((s, replacer) => {
        if(!replacer.string) {
          const replacement = replacer.regexp.exec(s);
          if(replacement) {
            throw new Error(`Only dynamic import supported when trying to rewrite (${replacement[0]}). Please see webpack-import-maps-loader/README.md`);
          }
          return s;
        }
        return s.replace(replacer.regexp, replacer.string, src);
      }, src), source);
}

module.exports = ImportMapsLoader;
