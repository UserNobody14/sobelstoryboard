import json
import logging
from zipping_files import zipping_files

def lambda_handler(event, context):
    # TODO implement
    body = event['body']
    print(body)
    nevent = json.loads(body)
    folder = nevent['folder']
    num_expected = nevent['expected']
    zip_name = nevent['zipFileName']
    print('FOLDER: {} NUM_EXPECTED {} ZIP_NAME {}'.format(folder, num_expected, zip_name))
    return zipping_files(folder, num_expected, zip_name)
