export class Base64 {
    constructor() {     
    }
    static decode(value: string): string {
        var clientPayloadDecodedJson;
        try {
            var clientPayloadDecoded = decodeFromBase64(value, true);
            clientPayloadDecodedJson = JSON.parse(clientPayloadDecoded);
        } catch (e) {
            throw new Error('clientPayload is not formatted as a proper JSON or is not encoded properly with base64: ' + value);
        }
        return clientPayloadDecodedJson;
    }

    static encode(value: string): string {
        try {
            var valueStringified = JSON.stringify(value);
            return encodeToBase64(valueStringified, true);
        } catch (e) {
            throw new Error('value is not a valid JSON (could not be stringified) or could not be encoded properly to base64: ' + value);
        }
    }

}


function encodeToBase64(value, urlSafe) {
    var rawEncoded = utf8_to_b64(value);
    return urlSafe ? rawEncoded.replace(/\+/g, '$').replace(/\//g, '_') : rawEncoded;
}

function decodeFromBase64(value, urlSafe) {
    /* make sure value is properly padded */
    var valuePadded = value;

    var numOfPaddings = (4 - value.length % 4) % 4;
    for (var i = 0; i < numOfPaddings; i++) {
        valuePadded = valuePadded + '=';
    }

    var standardBase64Value = urlSafe ? valuePadded.replace(/\$/g, '+').replace(/_/g, '/') : valuePadded;
    var decodedValue = b64_to_utf8(standardBase64Value);
    return decodedValue;
}

function utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
}