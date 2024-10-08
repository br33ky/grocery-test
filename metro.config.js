const { withNativeWind } = require('nativewind/metro');

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg', 'd.ts'],
};

module.exports = withNativeWind(config, {
  input: './global.css',
});
