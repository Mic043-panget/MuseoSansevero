/**
 * Search/filter a list of items/products.
 *
 * Behavior:
 * - Tokenizes the query and requires all tokens to match (AND semantics).
 * - Tokens match against name, category, and description.
 * - Numeric token matches price (rounded).
 * - Supports optional filters via `options`: minPrice, maxPrice, categories (array).
 *
 * @param {string} query - free-text query (can contain multiple words)
 * @param {Array<Object>} list - array of item objects
 * @param {Object} [options]
 * @param {number} [options.minPrice] - inclusive minimum price
 * @param {number} [options.maxPrice] - inclusive maximum price
 * @param {Array<string>} [options.categories] - allowed categories
 * @returns {Array<Object>} filtered list of items
 */
export default function searchItems(query, list = [], options = {}) {
  const q = (query || '').trim().toLowerCase();
  const { minPrice, maxPrice, categories } = options || {};

  const hasFilters = typeof minPrice === 'number' || typeof maxPrice === 'number' || (Array.isArray(categories) && categories.length > 0);
  if (!q && !hasFilters) return list;

  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return list.filter((item) => {
    if (!item) return false;

    if (typeof minPrice === 'number' && (typeof item.price !== 'number' || item.price < minPrice)) return false;
    if (typeof maxPrice === 'number' && (typeof item.price !== 'number' || item.price > maxPrice)) return false;
    if (Array.isArray(categories) && categories.length > 0) {
      const itemCategory = (item.category || '').toString().toLowerCase();
      const allowed = categories.map((c) => (c || '').toString().toLowerCase());
      if (!allowed.includes(itemCategory)) return false;
    }

    if (tokens.length === 0) return true;

    const haystack = [
      item.name,
      item.category,
      item.description || ''
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return tokens.every((token) => {
      if (!token) return true;

      if (/^\d+$/.test(token)) {
        const n = Number(token);
        if (typeof item.price === 'number' && Math.round(item.price) === n) return true;
        return haystack.includes(token);
      }

      return haystack.includes(token);
    });
  });
}
