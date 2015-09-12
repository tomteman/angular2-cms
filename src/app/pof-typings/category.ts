export interface ICategory {
	id: string;
	creatorId: string;
	name: string;
	root: boolean;
	public: boolean;
}

export interface ISeedCategory {
	name: string;
	public: boolean;
}