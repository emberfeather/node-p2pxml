#!/usr/bin/env node

var futures = require('futures');
var optimist = require('optimist');
var orm = require('orm');
var winston = require('winston');
var xml2object = require('xml2object');

var sequence = futures.sequence();

var Loan, PaymentHistory;

winston.cli(); // CLI FTW!

// Command line usage
var argv = optimist.usage('Usage: $0 --connection protocol://username:password@hostname/database xmlFile')
	.describe('connection', 'Database connection string. See `node-orm` module for more details.')
	.demand(['connection', 1])
	.argv;

var filename = argv._[0]
var db;

// Connect to the database
sequence.then(function(next, error) {
	db = orm.connect(argv.connection, function (success, db) {
		if (!success) {
			console.error("Could not connect to database!");

			process.exit(1);
		}

		// Define the model
		Loan = db.define('Loan', {
			LoanID: String,
			AmountRequested: { type: 'float' },
			AmountFundedByInvestors: { type: 'float' },
			TotalAmountFunded: { type: 'float' },
			Status: String,
			Term: { type: 'int' },
			Title: String,
			Purpose: String,
			Description: String,
			LoanGrade: String,
			InterestRate: { type: 'float' },
			MonthlyPayment: { type: 'float' },
			Fees: { type: 'float' },
			InterestPaid: { type: 'float' },
			TotalPayments: { type: 'int' },
			PrincipalRemaining: { type: 'float' },
			CreationDate: Date,
			OriginationDate: Date,
			ModifiedDate: Date,
			LatePayments: { type: 'int' },
			AgeInMonths: { type: 'int' },
			CreditScoreMin: { type: 'int' },
			CreditScoreMax: { type: 'int' },
			State: String,
			City: String,
			InquiriesLast6Months: { type: 'int' },
			RevolvingCreditUtilization: { type: 'float' },
			DebtToIncomeRatio: { type: 'float' },
			RateGroup: String
		}, {
			validations: {
				Status: orm.validators.rangeLength(undefined, 30),
				Title: orm.validators.rangeLength(undefined, 300),
				Purpose: orm.validators.rangeLength(undefined, 50),
				LoanGrade: orm.validators.rangeLength(undefined, 30),
				State: orm.validators.rangeLength(undefined, 5),
				City: orm.validators.rangeLength(undefined, 300),
				RateGroup: orm.validators.rangeLength(undefined, 5)
			}
		});

		PaymentHistory = db.define('PaymentHistory', {
			"Date": Date,
			PaymentCycle: { type: 'int' },
			InterestPaid: { type: 'float' },
			PrincipalPaid: { type: 'float' },
			Fees: { type: 'float' }
		});

		Loan.hasMany('Payments', PaymentHistory, 'Payment');

		Loan.sync();
		PaymentHistory.sync();

		next();
	});
});
