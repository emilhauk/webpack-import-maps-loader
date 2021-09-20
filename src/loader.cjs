const searchAndReplaceRules = (key, value) => [
  {
    regexp: new RegExp(`^\\s*import\\s+(.+?)\\s+from\\s+['"]${key}.+$`, 'm'),
    string: `import $1 from /* webpackIgnore: true */ '${value}';`,
  },
  {
    regexp: new RegExp(`^\\s*const\\s+(.+?)\\s+=\\s+require\\(\\s+['"]${key}.+$`, 'm'),
    string: `import $1 from /* webpackIgnore: true */ '${value}';`,
  },
  {
    regexp: new RegExp(`import\\(['"]${key}['"]\\)`),
    string: `import(/* webpackIgnore: true */'${value}')`,
  },
];

function ImportMapsLoader(source) {
  const options = this.getOptions();
  return Object.entries(options.imports)
    .reduce((src, entry) => searchAndReplaceRules(...entry)
      .reduce((s, replacer) => s.replace(replacer.regexp, replacer.string), src), source);
}

module.exports = ImportMapsLoader;
