import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities";

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOneOrFail({
            where: {
                email
            },
            select: ["email", "id", "password", "isAdm"]
        });

        return user;
    }
}

export default UserRepository;
