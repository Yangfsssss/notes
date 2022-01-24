export interface Doc {
	name: string;
	producers: ProducerIF[];
	demand: number;
	price: number;
}

export interface ProducerIF {
	name: string;
	cost: number;
	production: number;
}

export interface ProvinceIF {
	name: string;
	producers: ProducerIF[];
	totalProduction: number;
	demand: number;
	price: number;
}
