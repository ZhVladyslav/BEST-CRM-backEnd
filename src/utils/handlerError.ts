import { InternalServerErrorException } from '@nestjs/common';

export const handlerError = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    console.error(error);

    throw new InternalServerErrorException('DB error');
  }
};
