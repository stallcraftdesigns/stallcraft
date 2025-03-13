import { NextResponse } from "next/server";
import BrandsService from "../../../services/brandServices";
import consoleManager from "../../../utils/consoleManager";
import { ReplaceImage } from "../../../controller/imageController";

// Get a single brand by ID (GET)
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const brand = await BrandsService.getBrandById(id);

        if (!brand) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Brand not found",
            }, { status: 404 });
        }

        consoleManager.log("Fetched brand:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Brand fetched successfully",
            data: brand,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/brands/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update a brand by ID (PUT) - Handles image replacement
export async function PUT(req, { params }) {
    try {
      const { id } = await params;
      const formData = await req.formData(); // Get form data
      if (!id) throw new Error("Brand ID is required");
  
      let updateData = {};
      const title = formData.get("title");
      const image = formData.get("image"); // File input
      const status = formData.get("status");
  
      if (title) updateData.title = title;
      if (status) updateData.status = status;
  
      // Fetch existing brand to get old image URL
      const existingBrand = await BrandsService.getBrandById(id);
      if (!existingBrand) {
        return NextResponse.json({
          statusCode: 404,
          errorCode: "NOT_FOUND",
          errorMessage: "Brand not found",
        }, { status: 404 });
      }
  
      // If a new image is provided, replace the old one; otherwise, keep the existing one
      if (image) {
        if (!existingBrand.image) {
          console.warn("No old image URL found for replacement.");
        }
        const imageUrl = await ReplaceImage(image, existingBrand.image, 250, 150);
        updateData.image = imageUrl;
      } else {
        updateData.image = existingBrand.image; // Keep the existing image
      }
  
      // Update brand in database
      const updatedBrand = await BrandsService.updateBrand(id, updateData);
      consoleManager.log("Brand updated successfully:", id);
  
      return NextResponse.json({
        statusCode: 200,
        message: "Brand updated successfully",
        data: updatedBrand,
        errorCode: "NO",
        errorMessage: "",
      }, { status: 200 });
    } catch (error) {
      consoleManager.error("Error in PUT /api/brands/[id]:", error);
      return NextResponse.json({
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        errorMessage: error.message || "Internal Server Error",
      }, { status: 500 });
    }
  }

// Delete a brand by ID (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Brand ID is required");

        // Fetch existing brand to get old image URL
        const existingBrand = await BrandsService.getBrandById(id);
        if (!existingBrand) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Brand not found",
            }, { status: 404 });
        }

        // Delete brand image using ReplaceImage function (null prevents re-upload)
        if (existingBrand.image) {
            await ReplaceImage(null, existingBrand.image, 0, 0);
        }

        // Delete brand from DB
        await BrandsService.deleteBrand(id);
        consoleManager.log("Brand deleted successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Brand deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in DELETE /api/brands/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
