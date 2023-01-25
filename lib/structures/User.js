const Base = require("./Base");
const { CDNRoutes } = require("../rest/Endpoints");

/**
 * Represents a Discord User
 * @extends Base
 * @prop {String} id The ID of the user
 * @prop {Boolean} bot Whether the user is an OAuth bot or not
 * @prop {Boolean} system Whether the user is an official Discord system user (e.g. urgent messages)
 * @prop {Number?} flags Publicly visible flags for this user
 * @prop {String} username The username of the user
 * @prop {String} discriminator The discriminator of the user
 * @prop {String} avatar The hash of the user's avatar, or null if no avatar
 * @prop {String} banner The hash of the user's banner, or null if no banner
 * @prop {String} accentColor The user's banner color, or null if no banner color
 * @prop {Number?} createdTimestamp Timstamp of the user's creation date
 * @prop {String} tag The tag of the user
 * @prop {String} avatarURL The URL of the user's avatar
 * @prop {String} bannerURL The URL of the user's banner
 * @prop {String} defaultAvatarURL The default avatar URL of the user
 * @prop {Number?} defaultAvatar The default avatar of the user
 */


class User extends Base {
    constructor(client, data) {
        super(client, data);

        this.id = data.id;
        this.bot = null;
        this.system = null;
        this.flags = null;

        this._patch(data);
    }


    _patch(data) {
        if ('username' in data) {
            this.username = data.username;
        } else {
            this.username ??= null;
        }

        if ('discriminator' in data) {
            this.discriminator = data.discriminator;
        } else {
            this.discriminator ??= null;
        }

        if ('avatar' in data) {
            this.avatar = data.avatar;
        } else {
            this.avatar ??= null;
        }

        if ('banner' in data) {
            this.banner = data.banner;
        } else {
            this.banner ??= null;
        }

        if ('accent_color' in data) {
            this.accentColor = data.accent_color;
        } else {
            this.accentColor ??= undefined;
        }

        if ('bot' in data) {
            this.bot = Boolean(data.bot);
        } else if (!this.partial && typeof(this.bot) !== 'boolean') {
            this.bot ??= false;
        }

        if ('system' in data) {
            this.system = Boolean(data.system);
        } else if (!this.partial && typeof(this.system) !== 'boolean') {
            this.system ??= false;
        }
    }


    get tag() {
        return `${this.username}#${this.discriminator}`;
    }


    avatarURL(options) {
        if (!this.avatar) return null;

        return `${CDNRoutes.userAvatar(this.id, this.avatar, options)}`
    }


    bannerURL(options) {
        if (!this.banner) return null;

        return `${CDNRoutes.banner(this.id, this.banner, options)}`;
    }


    get defaultAvatarURL() {
        return `${CDNRoutes.defaultAvatarURL(this.defaultAvatar)}`;
    }


    get defaultAvatar() {
        return this.discriminator % 5;
    }
}


module.exports = User;