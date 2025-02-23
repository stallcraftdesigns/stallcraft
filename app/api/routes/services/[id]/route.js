import { NextResponse } from "next/server";
import ServiceService from "../../../services/serviceServices";
import consoleManager from "../../../utils/consoleManager";
import { ReplaceImage } from "../../../controller/imageController";

// Get a single service by ID (GET)
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const service = await ServiceService.getServiceById(id);

        if (!service) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Service not found",
            }, { status: 404 });
        }

        consoleManager.log("Fetched service:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Service fetched successfully",
            data: service,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/services/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update a service by ID (PUT)
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const formData = await req.formData();
        if (!id) throw new Error("Service ID is required");

        let updateData = {};
        const title = formData.get("name");
        const status = formData.get("status");
        const image = formData.get("image");
        const shortDescription = formData.get("shortDescription");
        const longDescription = formData.get("longDescription");
        

        if (title) updateData.title = title;
        if (status) updateData.status = status;
        if (shortDescription) updateData.shortDescription = shortDescription;
        if (longDescription) updateData.longDescription = longDescription;

        const existingService = await ServiceService.getServiceById(id);
        if (!existingService) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Service not found",
            }, { status: 404 });
        }

        if (image) {
            if (!existingService.image) {
                console.warn("No old image URL found for replacement.");
            }
            const imageUrl = await ReplaceImage(image, existingService.image, 500, 350);
            updateData.image = imageUrl;
        } else {
            updateData.image = existingService.image;
        }

        const updatedService = await ServiceService.updateService(id, updateData);
        consoleManager.log("Service updated successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Service updated successfully",
            data: updatedService,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in PUT /api/services/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete a service by ID (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Service ID is required");

        const existingService = await ServiceService.getServiceById(id);
        if (!existingService) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Service not found",
            }, { status: 404 });
        }

        if (existingService.image) {
            await ReplaceImage(null, existingService.image, 0, 0);
        }

        await ServiceService.deleteService(id);
        consoleManager.log("Service deleted successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Service deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in DELETE /api/services/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
