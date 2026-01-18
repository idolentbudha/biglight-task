import StyleDictionary from "style-dictionary";
import configs from "./config.js"; // Import your array of configs

async function runBuild() {
  console.log("🚀 Starting Multi-Brand Build...");

  // Loop through each config (BrandA, BrandB, Primitives)
  for (const config of configs) {
    // Determine which brand we are building for logging
    const brandName = config.platforms.css.files[0].destination;

    console.log(`\n📦 Building: ${brandName}`);

    try {
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    } catch (err) {
      console.error(`❌ Failed building ${brandName}:`, err.message);
    }
  }

  console.log("\n✅ All builds complete!");
}

runBuild();
