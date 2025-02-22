import { NextResponse } from "next/server";
import TestimonialService from "../../services/testimonialServices";
import consoleManager from "../../utils/consoleManager";
import { UploadImage } from "../../controller/imageController";

// Get all testimonials (GET)
export async function GET() {
    try {
        const testimonials = await TestimonialService.getAllTestimonials();
        consoleManager.log("Fetched all testimonials:", testimonials.length);
        return NextResponse.json({
            statusCode: 200,
            message: "Testimonials fetched successfully",
            data: testimonials,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/testimonials:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Add a new testimonial (POST)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const message = formData.get("message");
        const file = formData.get("image");

        if (!name || !message || !file) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "BAD_REQUEST",
                errorMessage: "Name, message, and image are required",
            }, { status: 400 });
        }

        // Upload image to Firebase Storage
        const imageUrl = await UploadImage(file, 150, 150);

        // Save testimonial in DB
        const newTestimonial = await TestimonialService.addTestimonial({
            name,
            message,
            image: imageUrl,
        });

        return NextResponse.json({
            statusCode: 201,
            message: "Testimonial added successfully",
            data: newTestimonial,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 201 });

    } catch (error) {
        consoleManager.error("Error in POST /api/testimonials:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
