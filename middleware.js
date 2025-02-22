import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read maintenance mode from env
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // If maintenance mode is enabled and user is NOT visiting the maintenance page, redirect them
  if (maintenanceMode && !pathname.startsWith("/maintenance")) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.get("isAuth")?.value === "true"; // Using cookies for authentication
  
  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

// Configure paths where middleware should run
export const config = {
  matcher: ["/admin/:path*", "/:path*"], // Apply to all routes for maintenance mode
};
