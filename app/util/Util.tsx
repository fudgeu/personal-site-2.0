export function dotProduct(a: number[], b: number[]): number {
	return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
}