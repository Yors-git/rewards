function rewards(purchase) {
	let reward;
	if (purchase <= 50) {
		reward = 0;
	} else if (purchase > 50 && purchase <= 100) {
		reward = purchase - 50;
	} else {
		reward = (purchase - 100) * 2 + 50;
	}
	let transReg = new Date();
	return { reward, transReg };
}

let transRecord = [];

class Client {
	constructor(name) {
		this.name = name;
		this.trans = [];
	}
}

class RewardsRecords {
	checkClientExists(name) {
		let check_client = transRecord.filter(rec => rec.name === name);
		return check_client;
	}
	createClient = name => {
		let check = this.checkClientExists(name);
		if (check[0]?.name !== name) {
			const client = new Client(name);
			transRecord.push(client);
			console.log('Client created successfully!!!');
		} else {
			console.log('Client already exist, try again');
		}
	};
	createTransaction(name, purchase) {
		let check = this.checkClientExists(name);
		if (check[0]?.name === name) {
			const clntTrans = transRecord.find(rec => rec.name === name);
			clntTrans.trans.push(rewards(purchase));
		} else {
			console.log(
				"Client doesn't exists, please add it first with 'createClient' method"
			);
		}
	}
	getDateIntervalAmount(lower, higher, clntTrans) {
		const higherLimitDate = new Date();
		higherLimitDate.setMonth(higherLimitDate.getMonth() - higher);
		const lowerLimitDate = new Date();
		lowerLimitDate.setMonth(lowerLimitDate.getMonth() - lower);
		const interval = clntTrans.trans.filter(
			rew => rew.transReg > lowerLimitDate && rew.transReg < higherLimitDate
		);
		if (interval.length > 0) {
			const total = interval
				.map(item => item.reward)
				.reduce((prev, next) => prev + next);
			return total;
		} else {
			const total = false;
			return total;
		}
	}
	checkTotalClientRewards(name) {
		let check = this.checkClientExists(name);
		if (check[0]?.name === name) {
			const clntTrans = transRecord.find(rec => rec.name === name);
			const total = this.getDateIntervalAmount(3, 0, clntTrans);
			total
				? console.log(
						`${name}'s total reward points for the last 3 months are ${total}`
				  )
				: console.log(`${name} has no reward points for the last 3 months`);
		} else {
			console.log(
				"Client doesn't exists, please add it first with 'createClient' method"
			);
		}
	}
	getRewardByMonth(name, monthBehind) {
		let check = this.checkClientExists(name);
		if (check[0]?.name === name) {
			const clntTrans = transRecord.find(rec => rec.name === name);
			if (monthBehind === 3) {
				const total = this.getDateIntervalAmount(3, 2, clntTrans);
				total
					? console.log(
							`${name}'s total reward points from 2 months ago are ${total}`
					  )
					: console.log(`${name} has no reward points for that month`);
			} else if (monthBehind === 2) {
				const total = this.getDateIntervalAmount(2, 1, clntTrans);
				total
					? console.log(
							`${name}'s total reward points from 1 months ago are ${total}`
					  )
					: console.log(`${name} has no reward points for that month`);
			} else if (monthBehind === 1) {
				const total = this.getDateIntervalAmount(1, 0, clntTrans);
				total
					? console.log(
							`${name}'s total reward points for the last month are ${total}`
					  )
					: console.log(`${name} has no reward points for that month`);
			} else {
				console.log('Please enter a month between 1 and 3 to check');
			}
		} else {
			console.log(
				"Client doesn't exists, please add it first with 'createClient' method"
			);
		}
	}
}

let newRecord = new RewardsRecords();
newRecord.createClient('Jorge');
newRecord.createTransaction('Jorge', 79);
newRecord.createTransaction('Jorge', 120);
newRecord.createTransaction('Jorge', 90);
//Change one transaction date older than 3 months to test that it's not taken in account
transRecord[0].trans[0].transReg.setMonth(
	transRecord[0].trans[0].transReg.getMonth() - 3
);
//Check total client rewards from the last 3 months
newRecord.checkTotalClientRewards('Jorge');
//Change transaction date to older than 2 months to test that appears where it's supposed to
transRecord[0].trans[1].transReg.setMonth(
	transRecord[0].trans[1].transReg.getMonth() - 2
);
newRecord.getRewardByMonth('Jorge', 3);
