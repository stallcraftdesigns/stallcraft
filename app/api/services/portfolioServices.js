const { db } = require("../config/firebase");
const consoleManager = require("../utils/consoleManager");
const admin = require("firebase-admin");

class PortfolioService {
    static portfolios = [];
    static isInitialized = false;

    // Initialize Firestore real-time listener (runs once)
    static initPortfolios() {
        if (this.isInitialized) return;

        consoleManager.log("Initializing Firestore listener for portfolios...");
        const portfoliosCollection = db.collection("portfolios");

        portfoliosCollection.onSnapshot((snapshot) => {
            this.portfolios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            consoleManager.log("🔥 Firestore Read: Portfolios updated, count:", this.portfolios.length);
        });

        this.isInitialized = true;
    }

    // Get all portfolio projects (Uses cache unless forceRefresh is true)
    static async getAllPortfolios(forceRefresh = false) {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing portfolios from Firestore...");
            const snapshot = await db.collection("portfolios").get();
            this.portfolios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.isInitialized = true;
        } else {
            consoleManager.log("Returning cached portfolios. No Firestore read.");
        }
        return this.portfolios;
    }

    // Add a new portfolio project with createdOn timestamp
    static async addPortfolio(portfolioData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const newPortfolioRef = await db.collection("portfolios").add({
                ...portfolioData,
                createdOn: timestamp,
            });

            consoleManager.log("✅ New portfolio project added with ID:", newPortfolioRef.id);

            // Force refresh the cache after adding a new portfolio project
            await this.getAllPortfolios(true);

            return { id: newPortfolioRef.id, ...portfolioData, createdOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error adding portfolio project:", error);
            throw new Error("Failed to add portfolio project");
        }
    }

    // Get portfolio project by ID (fetches from cache first)
    static async getPortfolioById(portfolioId) {
        try {
            // Check if portfolio exists in cache
            const cachedPortfolio = this.portfolios.find((p) => p.id === portfolioId);
            if (cachedPortfolio) {
                consoleManager.log("✅ Portfolio fetched from cache:", portfolioId);
                return cachedPortfolio;
            }

            // Fetch from Firestore if not in cache
            const portfolioRef = db.collection("portfolios").doc(portfolioId);
            const doc = await portfolioRef.get();

            if (!doc.exists) {
                consoleManager.warn("⚠️ Portfolio not found:", portfolioId);
                return null;
            }

            consoleManager.log("✅ Portfolio fetched from Firestore:", portfolioId);
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            consoleManager.error("❌ Error fetching portfolio by ID:", error);
            throw new Error("Failed to fetch portfolio");
        }
    }

    // Update portfolio project with updatedOn timestamp
    static async updatePortfolio(portfolioId, updatedData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const portfolioRef = db.collection("portfolios").doc(portfolioId);
            await portfolioRef.update({
                ...updatedData,
                updatedOn: timestamp,
            });

            consoleManager.log("✅ Portfolio updated:", portfolioId);

            // Force refresh the cache after updating a portfolio project
            await this.getAllPortfolios(true);

            return { id: portfolioId, ...updatedData, updatedOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error updating portfolio:", error);
            throw new Error("Failed to update portfolio");
        }
    }

    // Delete portfolio project
    static async deletePortfolio(portfolioId) {
        try {
            await db.collection("portfolios").doc(portfolioId).delete();
            consoleManager.log("✅ Portfolio deleted:", portfolioId);

            // Force refresh the cache after deleting a portfolio project
            await this.getAllPortfolios(true);

            return { success: true, message: "Portfolio deleted successfully" };
        } catch (error) {
            consoleManager.error("❌ Error deleting portfolio:", error);
            throw new Error("Failed to delete portfolio");
        }
    }
}

module.exports = PortfolioService;
