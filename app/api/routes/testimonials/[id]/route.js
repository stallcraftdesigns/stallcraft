import { NextResponse } from "next/server";
import TestimonialService from "../../../services/testimonialServices";
import consoleManager from "../../../utils/consoleManager";

// Get a single testimonial by ID (GET)
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const testimonial = await TestimonialService.getTestimonialById(id);

        if (!testimonial) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Testimonial not found",
            }, { status: 404 });
        }

        consoleManager.log("Fetched testimonial:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Testimonial fetched successfully",
            data: testimonial,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/testimonials/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update a testimonial by ID (PUT)
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const formData = await req.formData();
        if (!id) throw new Error("Testimonial ID is required");

        let updateData = {};
        const title = formData.get("title");
        const email = formData.get("email");
        const phoneNo = formData.get("phoneNo");
        const message = formData.get("message");
        const status = formData.get("status");

        if (title) updateData.title = title;    
        if (status) updateData.status = status;
        if (email) updateData.email = email;
        if (phoneNo) updateData.phoneNo = phoneNo;
        if (message) updateData.message = message;
    

        const existingTestimonial = await TestimonialService.getTestimonialById(id);
        if (!existingTestimonial) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Testimonial not found",
            }, { status: 404 });
        }

        const updatedTestimonial = await TestimonialService.updateTestimonial(id, updateData);
        consoleManager.log("Testimonial updated successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Testimonial updated successfully",
            data: updatedTestimonial,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in PUT /api/testimonials/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete a testimonial by ID (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        if (!id) throw new Error("Testimonial ID is required");

        const existingTestimonial = await TestimonialService.getTestimonialById(id);
        if (!existingTestimonial) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Testimonial not found",
            }, { status: 404 });
        }

        await TestimonialService.deleteTestimonial(id);
        consoleManager.log("Testimonial deleted successfully:", id);

        return NextResponse.json({
            statusCode: 200,
            message: "Testimonial deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in DELETE /api/testimonials/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
