import {initEccLib, Psbt} from "bitcoinjs-lib";
import * as ecc from 'tiny-secp256k1';

initEccLib(ecc);

const schnorrValidator = (
    pubkey,
    msghash,
    signature,
) => {
    return ecc.verifySchnorr(msghash, pubkey, signature);
}

const psbtBase64 = "cHNidP8BAFICAAAAAe1h73A6zedruNERV6JU7Ty1IlYZh2KO1cBklZqCMEy8AAAAAAD/////ARAnAAAAAAAAFgAUS0GlfqWSeEWIpwPwrvRIjBbJQroAAAAAAAEA/TgBAQAAAAABAnGJ6st1FIvYLEVbJMQaZ3HSOJnkw5C+ViCuJYiFEYosAAAAAAD9////xuZd0xArNSaBuElLX3nzjwtZW95O7L/wbz94v+v0vuYAAAAAAP3///8CECcAAAAAAAAiUSAVbMSHgwYVdyBgfNy0syr6TMaFOGhFjXJYuQcRLlpDS8hgBwAAAAAAIlEgthWGz3o2R7WpgjIK52ODoEaA/0HcImSUjVk6agZgghwBQIP9WWErMfeBBYyuHuSZS7MdXVICtlFgNveDrvuXeQGSZl1gGG6/r3Aw7h9TifGtoA+7JwYBjLMcEG6hbeyQGXIBQNSqKH1p/NFzO9bxe9vpvBZQIaX5Qa9SY2NfNCgSRNabmX5EiaihWcLC+ALgchm7DUfYrAmi1r4uSI/YaQ1lq8gAAAAAAQErECcAAAAAAAAiUSAVbMSHgwYVdyBgfNy0syr6TMaFOGhFjXJYuQcRLlpDSwEDBIMAAAABCEMBQZUpv6e1Hwfpi/PpglkkK/Rx40vZIIHwtJ7dXWFZ5TcZUEelCnfKOAWZ4xWjauYM2y+JcgFcVsuPzPuiM+z5AH+DARNBlSm/p7UfB+mL8+mCWSQr9HHjS9kggfC0nt1dYVnlNxlQR6UKd8o4BZnjFaNq5gzbL4lyAVxWy4/M+6Iz7PkAf4MBFyC6ZCT2zZVrEbkw/T1fyS8eLKQaP2MH6rzdlMauGvQzLQAA";

const psbt = Psbt.fromBase64(psbtBase64);

let valid;

try {
    valid = psbt.validateSignaturesOfAllInputs(schnorrValidator)
} catch (e) {
    valid = false;
}

console.assert(valid === false)