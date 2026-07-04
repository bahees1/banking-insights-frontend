export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
}

export type AuthOptions = {
    token?: string | null;
};

export function buildAuthHeaders(token?: string | null): HeadersInit {
    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function apiFetch(
    path: string,
    options: RequestInit = {},
    authOptions: AuthOptions = {}
): Promise<Response> {
    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...buildAuthHeaders(authOptions.token),
            ...options.headers,
        },
    });
}