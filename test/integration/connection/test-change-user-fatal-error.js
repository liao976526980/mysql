// This test verifies that changeUser errors are treated as fatal errors.  The
// rationale for that is that a failure to execute a changeUser sequence may
// cause unexpected behavior for queries that were enqueued under the
// assumption of changeUser to succeed.

var common     = require('../../common');
var connection = common.createConnection();
var assert     = require('assert');

var err;
connection.changeUser({user: 'does-not-exist'}, function(_err) {
  err = _err;
});

process.on('exit', function() {
  assert.equal(err.code, 'ER_ACCESS_DENIED_ERROR');
  assert.equal(err.fatal, true);
});