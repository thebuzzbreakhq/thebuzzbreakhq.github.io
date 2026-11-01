// Estimate reading time from raw post text (~200 words per minute).
export function readingTime(text: string): number {
	const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function readingTimeLabel(text: string): string {
	return `${readingTime(text)} min read`;
}
