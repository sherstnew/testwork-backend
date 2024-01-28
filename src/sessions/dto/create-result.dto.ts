import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  result: number;
}
