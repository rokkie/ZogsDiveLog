// equals
export const eq = 'eq';

// greater than or equals
export const gte = 'gte';

// greater than
export const gt = 'gt';

// less then or equal
export const lte = 'lte';

// less than
export const lt = 'lt';

// not equal
export const neq = 'neq';

// LIKE operator (use * in place of %)
export const like	= 'like';

// ILIKE operator (use * in place of %)
export const ilike = 'ilike';

// one of a list of values e.g. ?a=in.1,2,3
export const IN	 = 'in';

// not one of a list of values e.g. ?a=notin.1,2,3
export const notin = 'notin';

// checking for exact equality (null,true,false)
export const is = 'is';

// checking for exact inequality (null,true,false)
export const isnot = 'isnot';

// full-text search using to_tsquery
export const ft = '@@';

// contains e.g. ?tags=@>.{example, new}
export const contains = '@>';

// contained in e.g. values=<@{1,2,3}
export const contained = '<@';

// negates another operator
export const not = 'not';
