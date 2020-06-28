// jest doesn't understand ESM natively yet
// so we need to use babel until it does.
// that's also why this module has the .cjs
// extension, so it gets treated as a
// commonjs module instead.
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
