import {initEccLib, Psbt} from "bitcoinjs-lib";
import * as ecc from 'tiny-secp256k1';
import {ECPairFactory} from "ecpair";

initEccLib(ecc);

const schnorrValidator = (
    pubkey,
    msghash,
    signature,
) => {
    return ecc.verifySchnorr(msghash, pubkey, signature);
}

const ecdsaValidator = (
    pubkey,
    msghash,
    signature
) => {
    return ECPairFactory(ecc).fromPublicKey(pubkey).verify(msghash, signature);
}

// P0st
//const psbtBase64 = "cHNidP8BAFICAAAAAdJ2lzXtKa+ZQiIWfwxSJqojirG6/s1WCjHZl7+Blyi7AAAAAAD/////AQCE1xcAAAAAFgAU3bdx2mKR2UUVC0EMv2L40UJgDbQAAAAAAAEAXgIAAAABeqPU9hENv2ziQ2s3V2LmzcPagYlKZWm+m0gZpK0uySoAAAAAAP////8BHRIAAAAAAAAiUSCuznAvGA9Kk6mkGJlbXZgjPpNfZjscForD3eOfG280gQAAAAABASsdEgAAAAAAACJRIK7OcC8YD0qTqaQYmVtdmCM+k19mOxwWisPd458bbzSBAQMEgwAAAAETQX1hF7y3twZoNzmNiurwh+pPn4txBVWiw9x+Cgw6QfiZKVXt46X4vJIDmYmLdOzaRTa28u8C1SAEWtxOxkq/2BKDARcgWZDOWF7OQkNQiGBEk2soeKm9tnWO5z/Uij6f5fabsksAAA==";
const psbtBase64 = "cHNidP8BAF4CAAAAAU6UzYPa7tES0HoS+obnRJuXX41Ob64Zs59qDEyKsu1ZAAAAAAD/////AYAzAjsAAAAAIlEgIlIzfR+flIWYTyewD9v+1N84IubZ/7qg6oHlYLzv1aYAAAAAAAEAXgEAAAAB8f+afEJBun7sRQLFE1Olc/gK9LBaduUpz3vB4fjXVF0AAAAAAP3///8BECcAAAAAAAAiUSAiUjN9H5+UhZhPJ7AP2/7U3zgi5tn/uqDqgeVgvO/VpgAAAAABASsQJwAAAAAAACJRICJSM30fn5SFmE8nsA/b/tTfOCLm2f+6oOqB5WC879WmAQMEgwAAAAETQWQwNOao3RMOBWPuAQ9Iph7Qzk47MvroTHbJR49MxKJmQ6hfhZa5wVVrdKYea5BW/loqa7al2pYYZMlGvdS06wODARcgjuYXxIpyOMVTYEvl35gDidCm/vUICZyuNNZKaPz9dxAAAQUgjuYXxIpyOMVTYEvl35gDidCm/vUICZyuNNZKaPz9dxAA";

const psbt = Psbt.fromBase64(psbtBase64);

let valid;

try {
    const input = psbt.data.inputs[0];
    const validator = input.tapInternalKey ? schnorrValidator : ecdsaValidator;

    valid = psbt.validateSignaturesOfAllInputs(validator);
} catch (e) {
    console.log(e)
    valid = false;
}

console.assert(valid === true)