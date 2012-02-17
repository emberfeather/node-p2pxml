#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode
	var models = require('./models');
	var optimist = require('optimist');
	var winston = require('winston');
	var xml2object = require('xml2object');

	var argv = optimist.argv;
	var Loan = models.Loan;

	winston.cli(); // CLI FTW!

	// Command line usage
	optimist.usage('Usage: $0 [--host HOST] [--port PORT] [--database DATABASE] [--user USER] [--passwd PASSWORD] xmlFile');
}());
