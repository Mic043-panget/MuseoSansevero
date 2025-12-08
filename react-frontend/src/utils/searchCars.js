/**
 * Search/filter a list of cars.
 *
 * Behavior:
 * - Tokenizes the query and requires all tokens to match (AND semantics).
 * - Tokens match against name, brand, type, year, specs and description.
 * - Numeric token matches year or exact-price (rounded).
 * - Supports optional filters via `options`: minPrice, maxPrice, types (array).
 *
 * @param {string} query - free-text query (can contain multiple words)
 * @param {Array<Object>} list - array of car objects
 * @param {Object} [options]
 * @param {number} [options.minPrice] - inclusive minimum price (same units as car.price)
 * @param {number} [options.maxPrice] - inclusive maximum price
 * @param {Array<string>} [options.types] - allowed car types (e.g. ['SUV','Sedan'])
 * @returns {Array<Object>} filtered list of cars
 *
 * Example:
 *  searchCars('tesla 2021', cars, { minPrice: 30000, types: ['EV'] })
 */
export default function searchCars(query, list = [], options = {}) {
  const q = (query || '').trim().toLowerCase();
  const { minPrice, maxPrice, types } = options || {};

  // if no query and no filters, return the original list
  const hasFilters = typeof minPrice === 'number' || typeof maxPrice === 'number' || (Array.isArray(types) && types.length > 0);
  if (!q && !hasFilters) return list;

  // token list for AND-matching
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return list.filter((car) => {
    // basic guard — ensure car exists
    if (!car) return false;

    // apply explicit options filters first
    if (typeof minPrice === 'number' && (typeof car.price !== 'number' || car.price < minPrice)) return false;
    if (typeof maxPrice === 'number' && (typeof car.price !== 'number' || car.price > maxPrice)) return false;
    if (Array.isArray(types) && types.length > 0) {
      // accept when car.type exists in allowed types (case-insensitive)
      const carType = (car.type || '').toString().toLowerCase();
      const allowed = types.map((t) => (t || '').toString().toLowerCase());
      if (!allowed.includes(carType)) return false;
    }

    // if there are no text tokens, we've passed the numeric/type filters
    if (tokens.length === 0) return true;

    // build a searchable haystack string
    const haystack = [
      car.name,
      car.brand,
      car.type,
      String(car.year || ''),
      car.specs || '',
      car.description || ''
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // every token must match (AND)
    return tokens.every((token) => {
      if (!token) return true;

      // numeric token: match year or exact price (rounded)
      if (/^\d+$/.test(token)) {
        const n = Number(token);
        if (car.year === n) return true;
        // compare rounded price (handles integer query like "50000")
        if (typeof car.price === 'number' && Math.round(car.price) === n) return true;
        return haystack.includes(token);
      }

      // default: substring match in haystack
      return haystack.includes(token);
    });
  });
}
