import { NextResponse } from "next/server";
import LeadService from "../../../services/leadServices";
import consoleManager from "../../../utils/consoleManager";

// Get lead by ID (GET)
export async function GET(req, {params}) {
    try {
        const { id } = await params; // Correctly extract params
        const lead = await LeadService.getLeadById(id);

        if (!lead) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Lead not found",
            }, { status: 404 });
        }

        consoleManager.log("Lead fetched:", lead);
        return NextResponse.json({
            statusCode: 200,
            message: "Lead fetched successfully",
            data: lead,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error) {
        consoleManager.error("Error in GET /api/leads/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update lead (PUT)
export async function PUT(req, {params}) {
    try {
        const { id } = await params; // Extract params properly
        const updatedData = await req.json();
        const updatedLead = await LeadService.updateLead(id, updatedData);

        if (!updatedLead) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Lead not found",
            }, { status: 404 });
        }

        consoleManager.log("Lead updated:", updatedLead);
        return NextResponse.json({
            statusCode: 200,
            message: "Lead updated successfully",
            data: updatedLead,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error) {
        consoleManager.error("Error in PUT /api/leads/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete lead (DELETE)
export async function DELETE(req, {params}) {
    try {
        const { id } = await params; // Extract params properly
        const isDeleted = await LeadService.deleteLead(id);

        if (!isDeleted.success) { // Ensure proper deletion check
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Lead not found",
            }, { status: 404 });
        }

        consoleManager.log("Lead deleted:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Lead deleted successfully",
            data: null,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error) {
        consoleManager.error("Error in DELETE /api/leads/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
