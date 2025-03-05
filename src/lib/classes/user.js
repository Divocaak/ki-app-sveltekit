// @ts-nocheck
import { Privilege } from "$lib/classes/privilege";
import { Status } from "$lib/classes/status";
import { PUBLIC_PRIVILEGE_ID_ADMIN, PUBLIC_STATUS_ID_APPROVED, PUBLIC_STATUS_ID_BANNED, PUBLIC_STATUS_ID_DELETED, PUBLIC_STATUS_ID_NEUTRAL } from "$env/static/public";

export class User {

    id;
    email;
    phone;
    fName = "";
    lName = "";
    status = null;
    privileges = [];

    constructor({ id, email, phone, fName = "", lName = "", status = null, privileges = [] }) {
        Object.assign(this, { id, email, phone, fName, lName, status, privileges });
    }

    static fromJSON(json) {
        return new User({
            id: json.id,
            email: json.email,
            fName: json.fName,
            lName: json.lName,
            phone: json.phone,
            status: new Status({
                id: json.status.id,
                label: json.status.label
            }),
            privileges: User.createPrivileges(json.privileges)
        });
    }

    setPrivileges(json) { this.privileges = User.createPrivileges(json); }

    static createPrivileges(json) { return json.map(privilege => new Privilege({ id: privilege.id, label: privilege.label })); }

    isAdmin() { return this.#checkForPrivilege(PUBLIC_PRIVILEGE_ID_ADMIN); }
    #checkForPrivilege(privilegeId) { return this.privileges.some((privilege) => privilege.id === parseInt(privilegeId)); }

    isNeutral() { return this.#checkForStatus(PUBLIC_STATUS_ID_NEUTRAL); }
    isApproved() { return this.#checkForStatus(PUBLIC_STATUS_ID_APPROVED); }
    isBanned() { return this.#checkForStatus(PUBLIC_STATUS_ID_BANNED); }
    isDeleted() { return this.#checkForStatus(PUBLIC_STATUS_ID_DELETED); }
    #checkForStatus(statusId) { return this.status.id === statusId; }

    getInfoString() { return `logged in as <b>${this.lName} ${this.fName}</b> (${this.email}, ${this.phone}, id: <i>${this.id}</i>)`; }
}