import { NextResponse } from "next/server";
import PortfolioService from "../../../services/portfolioServices";
import consoleManager from "../../../utils/consoleManager";
import { ReplaceImage } from "../../../controller/imageController";

// Get a single portfolio by ID (GET)
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const portfolio = await PortfolioService.getPortfolioById(id);

        if (!portfolio) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Portfolio not found",
            }, { status: 404 });
        }

        consoleManager.log("Fetched portfolio:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Portfolio fetched successfully",
            data: portfolio,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/portfolio/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update a portfolio by ID (PUT) - Handles image replacement
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const formData = await req.formData(); // Get form data
        if (!id) throw new Error("Portfolio ID is required");

        let updateData = {};
        const title = formData.get("title");
        const image = formData.get("image"); // File input
        const status = formData.get("status")
        const service = formData.get("service")

        if (title) updateData.title = title;
        if (status) updateData.status = status; 
        if (service) updateData.service = service;

        // Fetch existing portfolio to get old image URL
        const existingPortfolio = await PortfolioService.getPortfolioById(id);
        if (!existingPortfolio) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Portfolio not found",
            }, { status: 404 });
        }

        // If a new image is provided, replace the old one; otherwise, keep the existing one
        if (image) {
            if (!existingPortfolio.image) {
                console.warn("No old image URL found for replacement.");
            }
            const imageUrl = await ReplaceImage(image, existingPortfolio.image, 600, 400);
            updateData.image = imageUrl;
        } else {
            updateData.image = existingPortfolio.image; // Keep the existing image
        }

        // Update portfolio in database
        const updatedPortfolio = await PortfolioService.updatePortfolio(id, updateData);
        consoleManager.log("Portfolio updated successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Portfolio updated successfully",
            data: updatedPortfolio,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in PUT /api/portfolio/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete a portfolio by ID (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Portfolio ID is required");

        // Fetch existing portfolio to get old image URL
        const existingPortfolio = await PortfolioService.getPortfolioById(id);
        if (!existingPortfolio) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Portfolio not found",
            }, { status: 404 });
        }

        // Delete portfolio image using ReplaceImage function (null prevents re-upload)
        if (existingPortfolio.image) {
            await ReplaceImage(null, existingPortfolio.image, 0, 0);
        }

        // Delete portfolio from DB
        await PortfolioService.deletePortfolio(id);
        consoleManager.log("Portfolio deleted successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Portfolio deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in DELETE /api/portfolio/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
