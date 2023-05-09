export function removeDuplicates (array: any[]): any[] {
    const res = [...new Set(array)]
    return res
}