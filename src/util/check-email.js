const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

/**
 * Checks if a given value is a valid e-mail address
 *
 * @param   {String}  val Value to test
 * @return  {Boolean}
 */
export default val => re.test(val);
