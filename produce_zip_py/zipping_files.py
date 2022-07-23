import os
import boto3
import botocore
import logging
import tempfile
import uuid
import json
from io import BytesIO, StringIO
from zipfile import ZipFile, ZIP_DEFLATED
from sign_and_upload import create_presigned_url


def zipping_files(folder, num_expected, zip_name):
    s3 = boto3.resource('s3')

    BUCKET = 'fountaindalle'
    PREFIX_1 = folder
    s3_client = boto3.client('s3')
    s3_bucket = s3.Bucket(BUCKET)
    files_to_zip = []
    response = s3_client.list_objects_v2(Bucket=BUCKET, Prefix=PREFIX_1)
    unique_number = '{}'.format(uuid.uuid4())

    all = response['Contents']
    count_s3 = 0
    for i in all:
        files_to_zip.append(str(i['Key']))
        count_s3 = count_s3 + 1
    print(files_to_zip)
    if count_s3 != num_expected:
        return_value = {
            'currently_has': count_s3
        }
        return {
            'statusCode': 200,
            'body': json.dumps(return_value)
        }
    # we download all files to tmp directory of lambda for that we create directory structure in /tmp same as s3 files structure (subdirectory)

    for KEY in files_to_zip:
        try:
            local_file_name = '/tmp/' + KEY
            dirname = os.path.dirname(local_file_name)
            print('DIRNAME = {}    LOCAL_FILE_NAME = {}     KEY = {}'.format(local_file_name, dirname, KEY))
            if os.path.isdir(dirname):
                print(local_file_name)
            else:
                os.makedirs(dirname)

            s3_bucket.download_file(KEY, local_file_name)
        except botocore.exceptions.ClientError as e:
            print(e.response)

    # now create empty zip file in /tmp directory use suffix .zip if you want
    with tempfile.NamedTemporaryFile('w', suffix='.zip', delete=False) as f:
        with ZipFile(f.name, 'w', compression=ZIP_DEFLATED, allowZip64=True) as zip:
            for file in files_to_zip:
                zip.write('/tmp/' + file)

    output_s3_name = 'out/{}/{}__{}.zip'.format(folder.replace('/', ''), zip_name, unique_number)
    print(output_s3_name)
    # once zipped in temp copy it to your preferred s3 location
    s3.meta.client.upload_file(f.name, BUCKET, output_s3_name)
    print('All files zipped successfully!')
    resp_presigned = create_presigned_url(BUCKET, output_s3_name)

    return_value = {
        'download_from': resp_presigned
    }
    return {
        'statusCode': 200,
        'body': json.dumps(return_value)
    }