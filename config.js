import StyleDictionary from "style-dictionary";

const brands = ["BrandA", "BrandB"];

// 1. NAME TRANSFORM: Clean the variable names for CSS
StyleDictionary.registerTransform({
  name: "name/clean-ids",
  type: "name",
  transform: (token) => {
    return token.path
      .filter(
        (part) =>
          ![
            "Primitives",
            "Default",
            "Mapped",
            "Alias colours",
            "Alias",
            ...brands,
          ].includes(part),
      )
      .join("-")
      .replace(/[↘︎]/g, "")
      .replace(/[\s\/]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
  },
});

// 2. PARSER: Lift tokens to the root so references can find them
StyleDictionary.registerParser({
  name: "token-unwrapper",
  pattern: /\.json$/,
  // @ts-ignore
  parser: ({ contents }) => {
    const rawData = JSON.parse(contents);
    const unwrappedData = {};
    const currentBrand = globalThis.currentBuildBrand;

    Object.keys(rawData).forEach((key) => {
      // Only include Primitives or the Specific Brand we are currently looping through
      if (
        key.includes("Primitives/Default") ||
        (currentBrand && key.includes(currentBrand))
      ) {
        Object.assign(unwrappedData, rawData[key]);
      }
    });
    return unwrappedData;
  },
});

// 3. REFERENCE CLEANER: This fixes the "{Colour.Grey.100}" strings
// It strips the "Category" prefixes from the internal references
const fixReferenceStrings = (dictionary) => {
  const recursiveFix = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        recursiveFix(obj[key]);
      } else if (
        key === "value" &&
        typeof obj[key] === "string" &&
        obj[key].includes("{")
      ) {
        // Remove prefixes that our Parser stripped from the actual paths
        obj[key] = obj[key]
          .replace(/Colour\./g, "")
          .replace(/Brand\./g, "")
          .replace(/Alias\./g, "")
          .replace(/Font\./g, "");
      }
    }
  };
  recursiveFix(dictionary);
  return dictionary;
};

// 4. CONFIG GENERATOR
const configs = brands.map((brand) => {
  return {
    source: ["tokens-custom/**/*.json"],
    parsers: ["token-unwrapper"], // Explicitly use our custom parser
    preprocessors: [
      (dict) => {
        globalThis.currentBuildBrand = brand;
        return fixReferenceStrings(dict);
      },
    ],
    platforms: {
      css: {
        transforms: ["attribute/cti", "name/clean-ids", "color/css", "size/px"],
        buildPath: "build/css/",
        files: [
          {
            destination: `brand-${brand.toLowerCase()}.css`,
            format: "css/variables",
            options: {
              outputReferences: true,
              selector: `.brand-${brand.toLowerCase()}`,
            },
          },
        ],
      },
    },
  };
});

// Primitives Pass
configs.push({
  source: ["tokens-custom/**/*.json"],
  parsers: ["token-unwrapper"],
  preprocessors: [
    (dict) => {
      globalThis.currentBuildBrand = "Primitives/Default";
      return fixReferenceStrings(dict);
    },
  ],
  platforms: {
    css: {
      transforms: ["attribute/cti", "name/clean-ids", "color/css", "size/px"],
      buildPath: "build/css/",
      files: [
        {
          destination: "primitives.css",
          format: "css/variables",
          options: { selector: ":root", outputReferences: true },
        },
      ],
    },
  },
});

export default configs;
