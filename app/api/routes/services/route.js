import { NextResponse } from "next/server";
import ServiceService from "../../services/serviceServices";
import consoleManager from "../../utils/consoleManager";
import { UploadImage } from "../../controller/imageController";

// Get all services (GET)
export async function GET() {
    try {
        const services = await ServiceService.getAllServices();
        consoleManager.log("Fetched all services:", services.length);
        return NextResponse.json({
            statusCode: 200,
            message: "Services fetched successfully",
            data: services,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/services:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Add a new service (POST)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const file = formData.get("image");
        const shortDescription = formData.get("shortDescription");
        const longDescription = formData.get("longDescription");

        if (!name || !file) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "BAD_REQUEST",
                errorMessage: "Name and image are required",
            }, { status: 400 });
        }

        // Upload image to Firebase Storage
        const imageUrl = await UploadImage(file, 400, 200);

        // Save service in DB
        const newService = await ServiceService.addService({ name, image: imageUrl, shortDescription, longDescription });

        return NextResponse.json({
            statusCode: 201,
            message: "Service added successfully",
            data: newService,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 201 });

    } catch (error) {
        consoleManager.error("Error in POST /api/services:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
