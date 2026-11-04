export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblings = 1
) => {
  if (totalPages <= 0) return [];

  const safeCurrentPage = Math.min(
    Math.max(1, currentPage),
    totalPages
  );

  const totalNumbers = siblings * 2 + 5;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const startPage = Math.max(safeCurrentPage - siblings, 2);
  const endPage = Math.min(safeCurrentPage + siblings, totalPages - 1);

  const pages: (number | string)[] = [1];

  if (startPage > 2) pages.push("...");

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) pages.push("...");

  pages.push(totalPages);

  return pages;
};