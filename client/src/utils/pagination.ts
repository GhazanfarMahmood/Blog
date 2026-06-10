export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblings = 1
) => {
  const totalNumbers = siblings * 2 + 5; 
  const totalBlocks = totalNumbers + 2; 

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const startPage = Math.max(currentPage - siblings, 2);
  const endPage = Math.min(currentPage + siblings, totalPages - 1);

  const pages: (number | string)[] = [];

  pages.push(1);

  if (startPage > 2) {
    pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};