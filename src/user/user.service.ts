import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UserService {
    private readonly user:User[] = [
        {
            id: 1,
            name: 'Admin1',
            username: 'admin1',
            password: 'iamadmin1'
        },
        {
            id: 2,
            name: 'Admin2',
            username: 'admin2',
            password: 'iamadmin2'
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.user.find(user => user.username === username)
    }
}
