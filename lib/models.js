var models = require('ormnomnom').models;

module.exports.ns = models.namespace('p2pxml', function(ns) {
	var Loan = ns.create('Loan');

	Loan.schema({
		LoanID: models.CharField,
		//AmountRequested: models.DecimalField,
		//AmountFundedByInvestors: models.DecimalField,
		//TotalAmountFunded: models.DecimalField,
		Status: models.CharField({ max_length: 30 }),
		Term: models.IntegerField,
		Title: models.CharField({ max_length: 300 }),
		Purpose: models.CharField({ max_length: 50 }),
		Description: models.TextField,
		LoanGrade: models.CharField({ max_length: 5 }),
		//InterestRate: models.DecimalField,
		//MonthlyPayment: models.DecimalField,
		Fees: models.DecimalField,
		//InterestPaid: models.DecimalField,
		TotalPayments: models.IntegerField,
		//PrincipalRemaining: models.DecimalField,
		CreationDate: models.DateTimeField,
		OriginationDate: models.DateTimeField,
		ModifiedDate: models.DateTimeField,
		LatePayments: models.IntegerField,
		AgeInMonths: models.IntegerField,
		CreditScoreMin: models.IntegerField,
		CreditScoreMax: models.IntegerField,
		State: models.CharField({ max_length: 5 }),
		City: models.CharField({ max_length: 300 }),
		InquiriesLast6Months: models.IntegerField,
		//RevolvingCreditUtilization: models.DecimalField,
		//DebtToIncomeRatio: models.DecimalField,
		RateGroup: models.CharField({ max_length: 5 })
	});

	Loan.meta({
		'order_by':['-CreationDate']
	});

	module.exports.Loan = Loan;
});
