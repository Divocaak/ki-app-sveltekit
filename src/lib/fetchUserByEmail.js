// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";
import { User } from "$lib/classes/user.js";
import { Status } from "$lib/classes/status.js";

/**
 * Fetches full user data by email, including privileges.
 * @param {string} email - User email.
 * @returns {Promise<User|null>} - Fully constructed User object or null.
 */
export async function fetchUserByEmail(email) {
    // Fetch basic user info + status
    const [rows] = await pool.query(`
        SELECT u.id, u.email, u.pass_hash, u.phone, u.f_name, u.l_name, u.credits,
               s.id AS statusId, s.label
        FROM user_status us
        INNER JOIN user u ON us.id_user = u.id
        INNER JOIN status s ON us.id_status = s.id
        WHERE u.email = ?;
    `, [email]);

    if (rows.length === 0) return null;

    const baseUser = rows[0];

    // Build User instance
    const user = new User({
        id: baseUser.id,
        email: baseUser.email,
        fName: baseUser.f_name,
        lName: baseUser.l_name,
        phone: baseUser.phone,
        status: new Status({
            id: baseUser.statusId,
            label: baseUser.label
        }),
        credits: baseUser.credits
    });

    // Fetch privileges
    const [prows] = await pool.query(`
        SELECT p.id, p.label, s.id AS structureId, s.label AS structureLabel
        FROM user_privilege up
        INNER JOIN privilege p ON up.id_privilege = p.id
        LEFT JOIN structure s ON up.id_structure = s.id
        WHERE up.id_user = ?
        AND up.active IS TRUE;
    `, [user.id]);

    user.setPrivileges(prows);

    // Attach pass_hash temporarily for authentication
    user.pass_hash = baseUser.pass_hash;

    return user;
}
