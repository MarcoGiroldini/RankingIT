/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/**
 * Used to import json files
 */
declare module "*.json" {

	const providers: string[];

	const value: any;
	export default value;
}
