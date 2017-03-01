'use strict';

const DELIMETER = '/';
const NAMED_SEGMENT = ':';
const ASSIGNMENT = '=';
const OR_SIGN = '|';
const MATCH_ANY = '*';
const REGEX_SPACES = /\s/;
const VALID_SEGMENT = /^[a-z0-9_-]+$/i;
const ANY_VALID_SEGMENT = '[a-zA-Z0-9_-]+';
const IS_BEETWEN_PARENTHESES = /^\((.*)\)$/;

const re = createRegex('users/:action=(insert|update)/:id');
console.log(re);

module.exports = createRegex;

function createRegex(route) {
  return route.replace(REGEX_SPACES, '').split(DELIMETER)
    .map((segment, i) => {
      if (segment === MATCH_ANY) {
        return [i.toString(), ANY_VALID_SEGMENT];
      }

      if (VALID_SEGMENT.test(segment)) {
        return [i.toString(), segment];
      }

      if (segment[0] === NAMED_SEGMENT) {
        const namedSegment = segment.slice(1).split(ASSIGNMENT);
        const namedSegmentLen = namedSegment.length;
        const segmentName = namedSegment[0];
        const segmentOptions = namedSegment[1];

        if (VALID_SEGMENT.test(segmentName)) {
          if (namedSegmentLen === 1) {
            return [segmentName, ANY_VALID_SEGMENT];
          }

          if (namedSegmentLen === 2) {
            if (IS_BEETWEN_PARENTHESES.test(segmentOptions)) {
              const options = segmentOptions.slice(1, segmentOptions.length - 1).split(OR_SIGN);

              if (options.length > 1 && options.every((opt) => {
                console.log(opt);
                const result = VALID_SEGMENT.test(opt);
                return result;
              })) {
                return [segmentName, options.join('|')];
              }
            }

            throw new Error('Segment Invalid');
          }
        }
      }

      throw new Error('Segment Invalid');
    });
}
