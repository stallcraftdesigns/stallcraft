const { db } = require("../config/firebase");
const consoleManager = require("../utils/consoleManager");
const admin = require("firebase-admin");

class ServiceService {
    static services = [];
    static isInitialized = false;

    // Initialize Firestore real-time listener (runs once)
    static initServices() {
        if (this.isInitialized) return;

        consoleManager.log("Initializing Firestore listener for services...");
        const servicesCollection = db.collection("services");

        servicesCollection.onSnapshot((snapshot) => {
            this.services = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            consoleManager.log("🔥 Firestore Read: Services updated, count:", this.services.length);
        });

        this.isInitialized = true;
    }

    // Get all services (Uses cache unless forceRefresh is true)
    static async getAllServices(forceRefresh = false) {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing services from Firestore...");
            const snapshot = await db.collection("services").get();
            this.services = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.isInitialized = true;
        } else {
            consoleManager.log("Returning cached services. No Firestore read.");
        }
        return this.services;
    }

    // Get specific service by ID
    static async getServiceById(serviceId) {
        try {
            const serviceRef = db.collection("services").doc(serviceId);
            const doc = await serviceRef.get();

            if (!doc.exists) {
                consoleManager.warn("⚠️ Service not found:", serviceId);
                return null;
            }

            consoleManager.log("✅ Service fetched from Firestore:", serviceId);
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            consoleManager.error("❌ Error fetching service by ID:", error);
            throw new Error("Failed to fetch service");
        }
    }

    // Add a new service with createdOn timestamp
    static async addService(serviceData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const newServiceRef = await db.collection("services").add({
                ...serviceData,
                createdOn: timestamp,
            });

            consoleManager.log("✅ New service added with ID:", newServiceRef.id);
            
            // Force refresh the cache after adding a service
            await this.getAllServices(true);

            return { id: newServiceRef.id, ...serviceData, createdOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error adding service:", error);
            throw new Error("Failed to add service");
        }
    }

    // Update service with updatedOn timestamp
    static async updateService(serviceId, updatedData) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();
            const serviceRef = db.collection("services").doc(serviceId);
            await serviceRef.update({
                ...updatedData,
                updatedOn: timestamp,
            });

            consoleManager.log("✅ Service updated:", serviceId);

            // Force refresh the cache after updating a service
            await this.getAllServices(true);

            return { id: serviceId, ...updatedData, updatedOn: timestamp };
        } catch (error) {
            consoleManager.error("❌ Error updating service:", error);
            throw new Error("Failed to update service");
        }
    }

    // Delete service
    static async deleteService(serviceId) {
        try {
            await db.collection("services").doc(serviceId).delete();
            consoleManager.log("✅ Service deleted:", serviceId);
            
            // Force refresh the cache after deleting a portfolio project
            await this.getAllServices(true);

            return { success: true, message: "Service deleted successfully" };
        } catch (error) {
            consoleManager.error("❌ Error deleting service:", error);
            throw new Error("Failed to delete service");
        }
    }
}

module.exports = ServiceService;
