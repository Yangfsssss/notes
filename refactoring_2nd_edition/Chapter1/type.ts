export type Play = { name: string; type: string };

export type Plays = {
	[key: string]: Play;
};

export type APerformance = {
	play?: Play;
	amount?: number;
	volumeCredits?: number;
	playID: string;
	audience: number;
};

export type Invoice = {
	customer: string;
	performances: APerformance[];
};

export type StatementData = {
	customer: string;
	performances: APerformance[];
	totalAmount: number;
	totalVolumeCredits: number;
};
