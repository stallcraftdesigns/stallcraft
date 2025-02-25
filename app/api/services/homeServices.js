const { db } = require("../config/firebase");
const consoleManager = require("../utils/consoleManager");
const admin = require("firebase-admin");

class HomeService {
    static homeData = [];
    static isInitialized = false;

    // Initialize Firestore real-time listener for home content (runs once)
    static initHomeContent() {
        if (this.isInitialized) return;

        consoleManager.log("Initializing Firestore listener for home content...");
        const homeCollection = db.collection("home");

        homeCollection.onSnapshot((snapshot) => {
            this.homeData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            consoleManager.log("🔥 Firestore Read: Home content updated, count:", this.homeData.length);
        });

        this.isInitialized = true;
    }

    // Get all home content (Uses cache unless forceRefresh is true)
    static async getAllHomeContent(forceRefresh = false) {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing home content from Firestore...");
            const snapshot = await db.collection("home").get();
            this.homeData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.isInitialized = true;
        } else {
            consoleManager.log("Returning cached home content. No Firestore read.");
        }
        return this.homeData;
    }

    // Get all active home content (Uses cache unless forceRefresh is true)
    static async getActiveHomeContent(forceRefresh = false) {
        // Fetch all home content (either from cache or Firestore)
        const allActivecontents = await this.getAllHomeContent(forceRefresh);

        // Filter home content where status is 'active'
        const activeHomeContent = allActivecontents.filter((home) => home.status === "active");

        consoleManager.log("Returning active home content. Count:", activeHomeContent.length);
        return activeHomeContent;
    }

    // Get home content by ID (fetches from cache first)
    static async getHomeContentById(contentId) {
        try {
            // Check if content exists in cache
            const cachedContent = this.homeData.find((content) => content.id === contentId);
            if (cachedContent) {
                consoleManager.log("✅ Home content fetched from cache:", contentId);
                return cachedContent;
            }

            // Fetch from Firestore if not in cache
            const homeRef = db.collection("home").doc(contentId);
            const doc = await homeRef.get();

            if (!doc.exists) {
                consoleManager.warn("⚠️ Home content not found:", contentId);
                return null;
            }

            consoleManager.log("✅ Home content fetched from Firestore:", contentId);
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            consoleManager.error("❌ Error fetching home content by ID:", error);
            throw new Error("Failed to fetch home content");
        }
    }

    // Add new home content with createdOn timestamp
    static async addHomeContent(contentData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const newContentRef = await db.collection("home").add({
                ...contentData,
                createdOn: timestamp,
            });

            consoleManager.log("✅ New home content added with ID:", newContentRef.id);

            // Refresh cache after adding new content
            await this.getAllHomeContent(true);

            return { id: newContentRef.id, ...contentData, createdOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error adding home content:", error);
            throw new Error("Failed to add home content");
        }
    }

    // Update home content by ID with updatedOn timestamp
    static async updateHomeContent(contentId, updatedData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const homeRef = db.collection("home").doc(contentId);

            await homeRef.update({
                ...updatedData,
                updatedOn: timestamp,
            });

            consoleManager.log("✅ Home content updated:", contentId);

            // Refresh cache after update
            await this.getAllHomeContent(true);

            return { id: contentId, ...updatedData, updatedOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error updating home content:", error);
            throw new Error("Failed to update home content");
        }
    }

    // Delete home content by ID
    static async deleteHomeContent(contentId) {
        try {
            await db.collection("home").doc(contentId).delete();

            consoleManager.log("🗑️ Home content deleted:", contentId);

            // Refresh cache after deletion
            await this.getAllHomeContent(true);

            return { success: true, message: "Home content deleted successfully" };
        } catch (error) {
            consoleManager.error("❌ Error deleting home content:", error);
            throw new Error("Failed to delete home content");
        }
    }
}

module.exports = HomeService;
