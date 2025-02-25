import { NextResponse } from "next/server";
import HomeService from "../../../services/homeServices";
import consoleManager from "../../../utils/consoleManager";
import { ReplaceImage } from "../../../controller/imageController";

// Get a single home content by ID (GET)
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Home content ID is required");

        const homeContent = await HomeService.getHomeContentById(id);
        if (!homeContent) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Home content not found",
            }, { status: 404 });
        }

        consoleManager.log("Fetched home content:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Home content fetched successfully",
            data: homeContent,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/home/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update a home content by ID (PUT) - Handles image replacement
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Home content ID is required");

        const formData = await req.formData();
        let updateData = {};
        const title = formData.get("title");
        const image = formData.get("image"); // File input
        const status = formData.get("status");

        if (title) updateData.title = title;
        if (status) updateData.status = status;

        // Fetch existing home content
        const existingContent = await HomeService.getHomeContentById(id);
        if (!existingContent) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Home content not found",
            }, { status: 404 });
        }

        // If a new image is provided, replace the old one; otherwise, keep the existing one
        if (image) {
            if (!existingContent.image) {
                console.warn("No old image URL found for replacement.");
            }
            const imageUrl = await ReplaceImage(image, existingContent.image, 1920, 980);
            updateData.image = imageUrl;
        } else {
            updateData.image = existingContent.image; // Keep existing image
        }

        // Update home content in database
        const updatedContent = await HomeService.updateHomeContent(id, updateData);
        consoleManager.log("Home content updated successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Home content updated successfully",
            data: updatedContent,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in PUT /api/home/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete a home content by ID (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Home content ID is required");

        // Fetch existing home content
        const existingContent = await HomeService.getHomeContentById(id);
        if (!existingContent) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Home content not found",
            }, { status: 404 });
        }

        // Delete home banner image
        if (existingContent.image) {
            await ReplaceImage(null, existingContent.image, 0, 0);
        }

        // Delete home content from DB
        await HomeService.deleteHomeContent(id);
        consoleManager.log("Home content deleted successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Home content deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in DELETE /api/home/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
