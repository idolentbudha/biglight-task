import StyleDictionary from "style-dictionary";
import {
  brands,
  createConfigForBrand,
  createPrimitivesConfig,
  createResponsiveConfig,
  sanitizeBrandName,
} from "./config.js";

async function runBuild() {
  // Read brand from environment (BIGLIGHT_BRAND from .env file)
  const targetBrand = process.env.BIGLIGHT_BRAND;
  const isProduction = process.env.NODE_ENV === "production";

  // In development, always build all brands for theme switching
  // In production, respect BIGLIGHT_BRAND value
  const buildAllBrands = !isProduction || !targetBrand || targetBrand === "all";

  console.log("\n" + "=".repeat(60));
  console.log("🏗️  BIGLIGHT TOKEN BUILD");
  console.log("=".repeat(60));

  if (!buildAllBrands) {
    // Validate brand exists
    const brandExists = brands.some(
      (b) => sanitizeBrandName(b) === targetBrand.toLowerCase(),
    );

    if (!brandExists) {
      console.error(
        `\n❌ Error: Brand "${targetBrand}" not found in config.js`,
      );
      console.error(
        `   Available brands: ${brands.map(sanitizeBrandName).join(", ")}`,
      );
      process.exit(1);
    }

    console.log(`\n📦 Mode: PRODUCTION`);
    console.log(`🎯 Brand: ${targetBrand.toUpperCase()}`);
    console.log(`💡 Only ${targetBrand} CSS will be generated`);
    console.log(`   → Optimized bundle (excludes other brands)\n`);
  } else {
    console.log(`\n📦 Mode: DEVELOPMENT`);
    console.log(`🎯 Brand: ALL BRANDS`);
    console.log(`💡 All brand CSS will be generated`);
    console.log(`   → Theme switching enabled\n`);
  }

  console.log("=".repeat(60) + "\n");

  // 1. Build primitives (always needed)
  console.log(`📦 Building: primitives.css`);
  globalThis.currentBuildBrand = "Primitives";

  try {
    const config = createPrimitivesConfig();
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  } catch (err) {
    console.error(`❌ Failed building primitives.css:`, err.message);
    process.exit(1);
  }

  // 2. Build responsive tokens (always needed)
  console.log(`📦 Building: responsive.css`);
  globalThis.currentBuildBrand = "Responsive";

  try {
    const config = createResponsiveConfig();
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  } catch (err) {
    console.error(`❌ Failed building responsive.css:`, err.message);
    process.exit(1);
  }

  // 3. Build brand-specific tokens
  const brandsToBuild = buildAllBrands
    ? brands
    : brands.filter((b) => sanitizeBrandName(b) === targetBrand.toLowerCase());

  for (const brand of brandsToBuild) {
    const brandSlug = sanitizeBrandName(brand);
    console.log(`\n📦 Building: ${brandSlug}.*`);

    globalThis.currentBuildBrand = brand;

    try {
      const config = createConfigForBrand(brand);
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    } catch (err) {
      console.error(`❌ Failed building ${brandSlug}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\n✅ Build complete!");
  console.log("=".repeat(60));

  if (!buildAllBrands) {
    console.log(`\n📂 Generated files (${targetBrand} only):`);
    console.log("   ✓ build/css/primitives.css");
    console.log("   ✓ build/css/responsive.css");
    console.log(`   ✓ build/css/${targetBrand}.primitives.css`);
    console.log(`   ✓ build/css/${targetBrand}.alias.css`);
    console.log(`   ✓ build/css/${targetBrand}.mapped.css`);
    console.log(`\n💡 Production bundle - ${targetBrand} only`);
    console.log(`   Other brand CSS excluded for optimal performance`);
  } else {
    console.log("\n📂 Generated files (all brands):");
    console.log("   ✓ build/css/primitives.css");
    console.log("   ✓ build/css/responsive.css");
    brands.forEach((brand) => {
      const slug = sanitizeBrandName(brand);
      console.log(`   ✓ build/css/${slug}.primitives.css`);
      console.log(`   ✓ build/css/${slug}.alias.css`);
      console.log(`   ✓ build/css/${slug}.mapped.css`);
    });
    console.log(`\n💡 Development bundle - all brands included`);
  }

  console.log("\n" + "=".repeat(60) + "\n");

  // Generate style imports after tokens are built
  console.log("📝 Generating style imports...\n");
  try {
    const { execSync } = await import("child_process");
    execSync("node generate-style-imports.js", { stdio: "inherit" });
  } catch (err) {
    console.error("❌ Failed to generate style imports:", err.message);
    process.exit(1);
  }
}

runBuild();
