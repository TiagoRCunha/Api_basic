function isMissingIndexError(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);
    return message.includes('SEARCH_INDEX_NOT_FOUND') || message.includes('Index not found');
}

export default {
    isMissingIndexError,
};