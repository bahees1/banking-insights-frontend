import type { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/server";

type DemoSignInTokenResponse = {
    token: string;
};

type ErrorResponse = {
    message: string;
};

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<DemoSignInTokenResponse | ErrorResponse>
) {
    if (request.method !== "POST") {
        response.setHeader("Allow", ["POST"]);

        return response.status(405).json({
            message: "Method not allowed.",
        });
    }

    const demoUserId = process.env.CLERK_DEMO_USER_ID;

    if (!demoUserId) {
        return response.status(500).json({
            message: "Demo user is not configured.",
        });
    }

    try {
        const client = await clerkClient();

        const signInToken = await client.signInTokens.createSignInToken({
            userId: demoUserId,
            expiresInSeconds: 60,
        });

        return response.status(200).json({
            token: signInToken.token,
        });
    } catch (error) {
        console.error("Unable to create demo sign-in token:", error);

        return response.status(500).json({
            message: "Unable to start demo session.",
        });
    }
}