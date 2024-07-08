const version = "/api";

let selectedUrls = {
	beServer: "https://be.travelrpg.com" + version,
	beSocket: "wss://be.travelrpg.com",
	version,
};

if (window.location.hostname == "localhost") {
	//dev
	selectedUrls = {
		...selectedUrls,
		beServer: "http://localhost:8000" + version,
		beSocket: "ws://localhost:8000",
	};
}

if (window.location.hostname == "fe-dev.travelrpg.com") {
	//dev
	selectedUrls = {
		...selectedUrls,
		beServer: "https://be-dev.travelrpg.com" + version,
		beSocket: "wss://be-dev.travelrpg.com",
	};
}

export const urls = {
	...selectedUrls,
};
