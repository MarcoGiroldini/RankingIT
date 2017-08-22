import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class HttpService extends Http {

	private apiServerUrl: string;

	constructor(backend: XHRBackend, options: RequestOptions) {
		super(backend, options);

		this.apiServerUrl = environment.apiServerUrl;
		if (!this.apiServerUrl.startsWith("https://") && !this.apiServerUrl.startsWith("http://")) {
			this.apiServerUrl = "http://" + this.apiServerUrl;
		}
		if (!this.apiServerUrl.endsWith("/")) {
			this.apiServerUrl += "/";
		}
	}

	public getApiServerUrl(): string {
		return this.apiServerUrl;
	}
    
}
