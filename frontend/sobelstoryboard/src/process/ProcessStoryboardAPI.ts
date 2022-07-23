import axios, {AxiosResponse} from "axios";

export interface PushFountainReturn {
    number_of_lines: number;
    last_scene: number;
    unique_number: string;
}

const pushFountainLambdaUrl = 'https://qnklgrqvlb4g3lok5ydo6kulpm0twvzx.lambda-url.us-west-2.on.aws/';

export function pushFountainPy(
    fountainText: string
): Promise<AxiosResponse<PushFountainReturn, any>> {
    return axios.post<PushFountainReturn>(
        pushFountainLambdaUrl,
        fountainText,
        {
            params: {
                dryrun: "yes"
            },
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    );
}