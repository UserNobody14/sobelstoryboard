import axios, {AxiosResponse} from "axios";

export type ProduceZipReturn = { 'download_from': string} | { 'currently_has': number };

export interface ProduceZipInput {
    folder: string;
    expected: number;
    zipFileName: string;
}

const produceZipLambdaUrl = 'https://x2jr3dghfqegxihamzknp2mcnm0tmfmz.lambda-url.us-west-2.on.aws/';

export function produceZipPy(
    folder: string,
    expected: number,
    zipFileName: string = 'output'
): Promise<AxiosResponse<ProduceZipReturn, any>> {
    return axios.post<ProduceZipReturn>(produceZipLambdaUrl, {
        folder,
        expected,
        zipFileName
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}