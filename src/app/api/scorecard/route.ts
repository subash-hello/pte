import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ScorecardModel from "@/models/ScorecardModel";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mockTestId, testTitle, overallScore, communicativeSkills, enablingSkills } = body;

    try {
      await connectToDatabase();
      const scorecard = await ScorecardModel.create({
        mockTestId,
        testTitle,
        overallScore,
        communicativeSkills,
        enablingSkills,
      });

      return NextResponse.json({ success: true, scorecardId: scorecard._id });
    } catch (dbErr) {
      console.warn("MongoDB Save Warning:", dbErr);
      return NextResponse.json({ success: true, warning: "Database offline" });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save scorecard" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const scorecards = await ScorecardModel.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json({ success: true, scorecards });
  } catch (error: any) {
    return NextResponse.json({ success: false, scorecards: [] });
  }
}
