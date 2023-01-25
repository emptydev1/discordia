const BaseApplication = require("./BaseApplication");
const { Routes, CDNRoutes } = require("../rest/Endpoints");

/**
 * Represents a Client Application
 * @extends BaseApplication
 * @prop {String} iconURL The application icon URL
*/

class ClientApplication extends BaseApplication {
    constructor(client, data) {
        super(client, data);
    }

    iconURL() {}

    async fetch() {
        const app = await this.client.rest.get(Routes.oauth2CurrentApplication());	
	super._patch(app);

        return this;
    }
}


module.exports = ClientApplication;