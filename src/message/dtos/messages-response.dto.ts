// import { ApiProperty } from "@nestjs/swagger";

export class MessagesResponseDTO {
    items: object;
    itemCount: number;
    pageCount: number;
    unseenItems: number;
}