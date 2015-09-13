export interface ICategory {
	id: string;
	creatorId: string;
	name: string;
	root: boolean;
	public: boolean;
	editors: Array<string>;
}

export interface ISeedCategory {
	name: string;
	public: boolean;
}