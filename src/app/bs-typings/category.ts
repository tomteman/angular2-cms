export interface ICategory {
	name: string;
	default: boolean;
	public: boolean;
	admins: Array<string>;
}

export interface ISeedCategory {
	name: string;
	public: boolean;
}