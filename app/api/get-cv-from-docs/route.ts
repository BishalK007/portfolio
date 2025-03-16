import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
    try {
        // console.log(process.env.GOOGLE_SERVICE_ACC_CREDENTIALS);
        // Load credentials from environment variables
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACC_CREDENTIALS || "{}");
        
        // Get fileId from request body
        const body = await req.json();
        const fileId = body.docId;
        
        if (!fileId) {
            return NextResponse.json({ error: "No document ID provided in request body" }, { status: 400 });
        }
        
        // Authenticate using the service account
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });
        
        const drive = google.drive({ version: "v3", auth });
        
        // Get file as PDF
        const response = await drive.files.export(
            { fileId, mimeType: "application/pdf" },
            { responseType: "stream" }
        );

        // Convert the Google API response stream to a Web ReadableStream
        const readable = Readable.toWeb(response.data) as unknown as ReadableStream;

        // Return the PDF as a streaming Response
        return new Response(readable, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=Bishal's_Resume.pdf",
            },
        });
    } catch (error) {
        console.error("Error downloading CV:", error);
        return NextResponse.json({ error: "Failed to download CV" }, { status: 500 });
    }
}