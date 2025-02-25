import { NextResponse } from "next/server";
import HomeService from "../../services/homeServices";
import consoleManager from "../../utils/consoleManager";
import { UploadImage } from "../../controller/imageController";

// Get all home content (GET)
export async function GET(req) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        let homeContent;

        // Fetch home content based on status filter
        if (status === "active") {
            homeContent = await HomeService.getActiveHomeContent();
            consoleManager.log("Fetched active home content:", homeContent.length);
        } else {
            homeContent = await HomeService.getAllHomeContent();
            consoleManager.log("Fetched all home content:", homeContent.length);
        }

        return NextResponse.json(
            {
                statusCode: 200,
                message: "Home content fetched successfully",
                data: homeContent,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 200 }
        );
    } catch (error) {
        consoleManager.error("❌ Error in GET /api/home:", error);
        return NextResponse.json(
            {
                statusCode: 500,
                errorCode: "INTERNAL_ERROR",
                errorMessage: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// Add a new home content entry (POST)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get("title");
        const file = formData.get("image");
        const status = formData.get("status");

        if (!title || !file) {
            return NextResponse.json(
                {
                    statusCode: 400,
                    errorCode: "BAD_REQUEST",
                    errorMessage: "Title and image are required",
                },
                { status: 400 }
            );
        }

        // Upload image to Firebase Storage
        const imageUrl = await UploadImage(file, 1920, 980);

        // Save home content in DB
        const newHomeContent = await HomeService.addHomeContent({
            title,
            image: imageUrl,
            status,
        });

        return NextResponse.json(
            {
                statusCode: 201,
                message: "Home content added successfully",
                data: newHomeContent,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 201 }
        );
    } catch (error) {
        consoleManager.error("❌ Error in POST /api/home:", error);
        return NextResponse.json(
            {
                statusCode: 500,
                errorCode: "INTERNAL_ERROR",
                errorMessage: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
