import { Common } from './cardio.common';
export declare class Cardio extends Common {

	public onScan(): Promise<any>;
	
}

/**
 * Check required permissions for using device camera.
 */
export function requestPermissions();