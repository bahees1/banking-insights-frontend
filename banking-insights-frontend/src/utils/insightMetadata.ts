export function parseMetadata<T>(metadataJson: string | null): T | null {
    if (!metadataJson) {
        return null;
    }

    try {
        return JSON.parse(metadataJson) as T;
    } catch {
        return null;
    }
}