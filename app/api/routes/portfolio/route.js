import { NextResponse } from "next/server";
import { UploadImage } from "../../controller/imageController";
import PortfolioService from "../../services/portfolioServices";
import consoleManager from "../../utils/consoleManager";

// Get all portfolios (GET)
export async function GET() {
    try {
        const portfolios = await PortfolioService.getAllPortfolios();
        consoleManager.log("✅ Fetched all portfolios:", portfolios.length);
        return NextResponse.json({
            statusCode: 200,
            message: "Portfolios fetched successfully",
            data: portfolios,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error) {
        consoleManager.error("❌ Error in GET /api/portfolio:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Add a new portfolio (POST)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get("title");
        const file = formData.get("image");

        if (!title || !file) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "BAD_REQUEST",
                errorMessage: "Title, and image are required",
            }, { status: 400 });
        }

        // Upload image to Firebase Storage (800x600 for portfolios)
        const imageUrl = await UploadImage(file, 800, 600);
        consoleManager.log("✅ Portfolio image uploaded:", imageUrl);

        // Save portfolio data in Firestore
        const newPortfolio = await PortfolioService.addPortfolio({
            title,
            image: imageUrl,
        });

        consoleManager.log("✅ Portfolio created successfully:", newPortfolio);

        return NextResponse.json({
            statusCode: 201,
            message: "Portfolio added successfully",
            data: newPortfolio,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 201 });

    } catch (error) {
        consoleManager.error("❌ Error in POST /api/portfolio:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
