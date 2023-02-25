import { Injectable, HttpException, HttpStatus, CACHE_MANAGER, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchService } from "src/search/services/search.service";
import { Repository } from "typeorm";
import { UserLoginDTO, UserResponseDTO } from "../dtos";
import { UserEntity } from "../entites/user.entity";







export class UserAccountService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager,// the use of the private
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>,
        private searchService : SearchService,
    ){}

    async showAll(): Promise<UserResponseDTO[]> {
        const users = await this.UserRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async login(data: UserLoginDTO):Promise<UserResponseDTO>{

        const {email, password} = data;
        const user  = await  this.UserRepository.findOne({where: { email }});

        if(!user || !await user.comparePassword(password)){
            throw new HttpException('Invalid email/password', HttpStatus.BAD_REQUEST);
        }

        const userResponseObject = user.toResponseObject();
        const {token } = userResponseObject;

        await this.cacheManager.set(email,token,{ttl: process.env.JWT_EXPIRATION || 604800 });
        return userResponseObject;

    } 

}