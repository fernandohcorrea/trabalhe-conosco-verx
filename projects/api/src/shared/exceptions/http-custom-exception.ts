import { HttpException, HttpStatus } from '@nestjs/common';
import slugify from 'slugify';

interface IHttpCustomExceptionProps {
  status: HttpStatus;
  message: string;
  tr_message_slug?: string;
  extra_info?: any;
}

/**
 * Http Custom Exception
 * Slugfy exception message
 */
export class HttpCustomException extends HttpException {
  constructor(data: IHttpCustomExceptionProps) {
    const exp: IHttpCustomExceptionProps = {
      status: data.status,
      message: data.message,
      tr_message_slug:
        data.tr_message_slug ??
        slugify(data.message, {
          replacement: '_',
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        }),
    };

    if (data.extra_info) {
      exp['extra_info'] = data.extra_info;
    }
    super(exp, data.status);
  }
}
