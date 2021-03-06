/*
 * Copyright (c) 2018 The Weibo-Picture-Store Authors. All rights reserved.
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file.
 */

import {hash_hmac} from "../../source/scripts/plugin/hash-hmac.js";
import {Base64} from "../../source/scripts/plugin/base64.js";

const appId = "200001";
const bucket = "newbucket";
const accessKey = "AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv";
const secretKey = "bLcPnl88WU30VY57ipRhSePfPdOfSruK";
const expired = 1522419808 + 2592000;
const onceExpired = 0;
const current = 1522419808;
const rdm = 1961275439;
const fileid = "/200001/newbucket/tencent_test.jpg";

const multiEffectSign = `a=${appId}&b=${bucket}&k=${accessKey}&e=${expired}&t=${current}&r=${rdm}&f=`;
const onceEffectSign = `a=${appId}&b=${bucket}&k=${accessKey}&e=${onceExpired}&t=${current}&r=${rdm}&f=${fileid}`;

/**
 * @desc Expected result generated by `hash_hmac` function in php
 */
async function hash_hmac_test() {
    const mhmac = await hash_hmac("sha-384", multiEffectSign, secretKey, false);
    const ohmac = await hash_hmac("sha-512", onceEffectSign, secretKey, false);
    const shmac = await hash_hmac("sha-256", "1", "1", false);
    const mhExpected = "cbb25a8f58be4b0bbc555a27e189f7b26f0b3d0b9d97ea4a153af216759ce6563223cee1b96e736fc31b1c65ab8e8b61";
    const ohExpected = "32536ae3d234c4e23ceae9b3354f2f3c1484fa932e095edb326d562c33a2c0f3f3c9e57a92e8ea38b06b7f83b292668620b9d2b1bfbbf5bfe71a27f5ed43871f";
    const shExpected = "6ff6ceedb1c100266849d7e4e13449c98d1c98e569994f8ddbfe7b52e780dead";
    console.assert(mhmac === mhExpected);
    console.assert(ohmac === ohExpected);
    console.assert(shmac === shExpected);

    const mSign = Base64.encode(await hash_hmac("sha-1", multiEffectSign, secretKey, true) + multiEffectSign);
    const oSign = Base64.encode(await hash_hmac("sha-1", onceEffectSign, secretKey, true) + onceEffectSign);
    const msExpected = "dBM9hPvw3PQFiuEtSjVhIgG7lcZhPTIwMDAwMSZiPW5ld2J1Y2tldCZrPUFLSURVZkxVRVVpZ1FpWHFtN0NWU3NwS0pudWFpSUt0eHFBdiZlPTE1MjUwMTE4MDgmdD0xNTIyNDE5ODA4JnI9MTk2MTI3NTQzOSZmPQ==";
    const osExpected = "TIERPVJEGcU+diIkEmU9mlcfdK1hPTIwMDAwMSZiPW5ld2J1Y2tldCZrPUFLSURVZkxVRVVpZ1FpWHFtN0NWU3NwS0pudWFpSUt0eHFBdiZlPTAmdD0xNTIyNDE5ODA4JnI9MTk2MTI3NTQzOSZmPS8yMDAwMDEvbmV3YnVja2V0L3RlbmNlbnRfdGVzdC5qcGc=";
    console.assert(mSign === msExpected);
    console.assert(oSign === osExpected);
    console.log("hash_hmac tested.");
}

hash_hmac_test().catch(reason => console.assert(false, reason));