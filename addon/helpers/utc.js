import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute([utcTime, format]) {
    this._super(...arguments);

    return this.moment.utc(moment.utc(utcTime, format));
  },
});
