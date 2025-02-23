const { db } = require("../config/firebase");
const consoleManager = require("../utils/consoleManager");
const admin = require("firebase-admin");

class BrandService {
    static brands = [];
    static isInitialized = false;

    // Initialize Firestore real-time listener (runs once)
    static initBrands() {
        if (this.isInitialized) return;

        consoleManager.log("Initializing Firestore listener for brands...");
        const brandsCollection = db.collection("brands");

        brandsCollection.onSnapshot((snapshot) => {
            this.brands = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            consoleManager.log("🔥 Firestore Read: Brands updated, count:", this.brands.length);
        });

        this.isInitialized = true;
    }

    // Get all brands (Uses cache unless forceRefresh is true)
    static async getAllBrands(forceRefresh = false) {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing brands from Firestore...");
            const snapshot = await db.collection("brands").get();
            this.brands = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.isInitialized = true;
        } else {
            consoleManager.log("Returning cached brands. No Firestore read.");
        }
        return this.brands;
    }

     // Get all active brands (Uses cache unless forceRefresh is true)
     static async getActiveBrands(forceRefresh = false) {
        // Fetch all brands (either from cache or Firestore)
        const allBrands = await this.getAllBrands(forceRefresh);

        // Filter brands where status is 'active'
        const activeBrands = allBrands.filter((brand) => brand.status === "active");

        consoleManager.log("Returning active brands. Count:", activeBrands.length);
        return activeBrands;
    }

    // Add a new brand with createdOn timestamp
    static async addBrand(brandData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const newBrandRef = await db.collection("brands").add({
                ...brandData,
                createdOn: timestamp,
            });

            consoleManager.log("✅ New brand added with ID:", newBrandRef.id);

            // Refresh the cache after adding a new brand
            await this.getAllBrands(true);

            return { id: newBrandRef.id, ...brandData, createdOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error adding brand:", error);
            throw new Error("Failed to add brand");
        }
    }

    // Get brand by ID (fetches from cache first)
    static async getBrandById(brandId) {
        try {
            // Check if brand exists in cache
            const cachedBrand = this.brands.find((brand) => brand.id === brandId);
            if (cachedBrand) {
                consoleManager.log("✅ Brand fetched from cache:", brandId);
                return cachedBrand;
            }

            // Fetch from Firestore if not in cache
            const brandRef = db.collection("brands").doc(brandId);
            const doc = await brandRef.get();

            if (!doc.exists) {
                consoleManager.warn("⚠️ Brand not found:", brandId);
                return null;
            }

            consoleManager.log("✅ Brand fetched from Firestore:", brandId);
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            consoleManager.error("❌ Error fetching brand by ID:", error);
            throw new Error("Failed to fetch brand");
        }
    }

    // Update brand with updatedOn timestamp
    static async updateBrand(brandId, updatedData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const brandRef = db.collection("brands").doc(brandId);
            await brandRef.update({
                ...updatedData,
                updatedOn: timestamp,
            });

            consoleManager.log("✅ Brand updated:", brandId);

            // Refresh the cache after updating a brand
            await this.getAllBrands(true);

            return { id: brandId, ...updatedData, updatedOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error updating brand:", error);
            throw new Error("Failed to update brand");
        }
    }

    // Delete brand
    static async deleteBrand(brandId) {
        try {
            await db.collection("brands").doc(brandId).delete();
            consoleManager.log("✅ Brand deleted:", brandId);

            // Refresh the cache after deleting a brand
            await this.getAllBrands(true);

            return { success: true, message: "Brand deleted successfully" };
        } catch (error) {
            consoleManager.error("❌ Error deleting brand:", error);
            throw new Error("Failed to delete brand");
        }
    }
}

module.exports = BrandService;
