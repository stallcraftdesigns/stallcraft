import { NextResponse } from "next/server";
import BrandsService from "../../services/brandServices";
import consoleManager from "../../utils/consoleManager";
import { UploadImage } from "../../controller/imageController";

// Get all brands (GET)
export async function GET(req) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        let brands;

        // Fetch brands based on status filter
        if (status === "active") {
            brands = await BrandsService.getActiveBrands();
            consoleManager.log("Fetched active brands:", brands.length);
        } else {
            brands = await BrandsService.getAllBrands();
            consoleManager.log("Fetched all brands:", brands.length);
        }


        return NextResponse.json({
            statusCode: 200,
            message: "Brands fetched successfully",
            data: brands,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/brands:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Add a new brand (POST)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get("title");
        const file = formData.get("image");
        const status = formData.get("status")

        if (!title || !file) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "BAD_REQUEST",
                errorMessage: "Title and image are required",
            }, { status: 400 });
        }

        // Upload image to Firebase Storage
        const imageUrl = await UploadImage(file, 200, 100);

        // Save brand in DB
        const newBrand = await BrandsService.addBrand({ title, image: imageUrl, status });

        return NextResponse.json({
            statusCode: 201,
            message: "Brand added successfully",
            data: newBrand,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 201 });

    } catch (error) {
        consoleManager.error("Error in POST /api/brands:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
